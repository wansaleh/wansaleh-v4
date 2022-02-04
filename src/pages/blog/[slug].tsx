import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { cloneElement, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Zoom from 'react-medium-image-zoom';
import { NotionRenderer } from 'react-notion';
import { readingTime } from 'reading-time-estimator';
import smartypants from 'remark-smartypants';

// import useMDX from '@/lib/hooks/use-mdx';
import { coverLoader, getBlurUrl } from '@/lib/images';
import {
  getAllPostsNotion,
  getPostBySlug,
  getPostMDX,
  Post,
} from '@/lib/posts-notion';

import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { post, blockMap, posts } = await getPostBySlug(params.slug);

  // const { code } = await getPostMDX(mdString);

  return {
    props: {
      post,
      blockMap,
      // code,
      posts,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPostsNotion();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: 'blocking',
  };
}

export default function PostPage({
  post,
  blockMap,
  // code,
  posts,
}: {
  post: Post;
  blockMap: any;
  // code: string;
  posts: Post[];
}) {
  const { theme } = useTheme();
  const router = useRouter();
  const [views, setViews] = useState(null);
  const [readTime, setReadTime] = useState<any>(null);
  const ref = useRef<HTMLElement>(null);

  // const { Component } = useMDX(code);

  useEffect(() => {
    async function loadViews() {
      const views = await fetch(`/api/post-views?slug=${post.slug}`).then(
        (res) => res.json()
      );

      setViews(views);
    }
    if (post.slug) {
      loadViews();
    }

    if (ref.current?.textContent) {
      setReadTime(readingTime(ref.current.textContent));
    }
  }, [post.slug]);

  return (
    <div className="min-h-screen w-full">
      <Seo templateTitle={`${post.title} | Blog`} />

      <div className="mb-8 mt-20 w-full">
        <div className="aspect-[4] relative">
          <Image
            src={post.cover as string}
            alt={post.title}
            className="object-center object-cover"
            loader={coverLoader}
            layout="fill"
            placeholder="blur"
            blurDataURL={getBlurUrl(post.cover)}
          />

          <button
            className="absolute bg-black/30 flex font-bold items-center m-4 p-1 px-3 rounded-md text-sm text-white transition hover:bg-black/60"
            onClick={() => router.back()}
          >
            <svg
              className="mr-1 stroke-current"
              height="1.25em"
              width="1.25em"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="19" x2="5" y1="12" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
        {post.coverCaption && (
          <ReactMarkdown
            className="caption font-medium layout leading-tight max-w-5xl p-4 text-center text-gray-500 text-sm"
            remarkPlugins={[smartypants]}
          >
            {post.coverCaption}
          </ReactMarkdown>
        )}
      </div>

      <div className="layout max-w-5xl my-16">
        <PageTitle title={post.title} subtitle={post.subtitle} large={false} />

        <div className="mb-4 mx-auto text-center text-gray-500 text-xl">
          {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy')}
          {readTime && <> &mdash; {readTime?.text}</>} &mdash;{' '}
          {post.tags?.join(', ')}
          {views && <> &mdash; {views} views</>}
        </div>
      </div>

      <div className="layout pb-24 lg:pb-40">
        <article
          ref={ref}
          className="mx-auto prose lg:prose-lg dark:prose-invert"
        >
          <ReactMarkdown
            remarkPlugins={[smartypants]}
            className="font-semibold leading-relaxed text-2xl text-gray-500"
          >
            {post.description}
          </ReactMarkdown>

          {/* <Component /> */}

          <NotionRenderer
            blockMap={blockMap}
            hideHeader
            customDecoratorComponents={{
              a: ({ decoratorValue, children }) => {
                let href = decoratorValue;
                if (href.startsWith('/')) {
                  const postWithId = posts.find(
                    (p) => p.id.replace(/-/g, '') === href.slice(1)
                  );
                  href = postWithId ? postWithId.slug : href;
                }

                return (
                  <Link href={href}>
                    <a className="notion-link">{children}</a>
                  </Link>
                );
              },
            }}
            customBlockComponents={{
              image: ({ renderComponent }) => {
                return (
                  <Zoom
                    overlayBgColorEnd={theme === 'dark' ? 'black' : 'white'}
                  >
                    {renderComponent()}
                  </Zoom>
                );
              },
            }}
          />
        </article>
      </div>
    </div>
  );
}
