import clsx from 'clsx';
import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Zoom from 'react-medium-image-zoom';
import { NotionRenderer } from 'react-notion';
import { readingTime } from 'reading-time-estimator';
import smartypants from 'remark-smartypants';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { getAllPostsNotion, getPostBySlug, Post } from '@/lib/posts-notion';

import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { post, blockMap, posts } = await getPostBySlug(params.slug);

  return {
    props: {
      post,
      blockMap,
      // code,
      allPosts: posts,
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
  allPosts,
}: {
  post: Post;
  blockMap: any;
  allPosts: Post[];
}) {
  const { theme } = useTheme();
  const [views, setViews] = useState(null);
  const [readTime, setReadTime] = useState<{
    minutes: number;
    words: number;
    text: string;
  } | null>(null);
  const ref = useRef<HTMLElement>(null);

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

      <div className="layout mb-32 mt-24">
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-4">
          <div>
            <Link href="/blog">
              <a className="flex items-center hover:text-brand">
                <svg
                  className="mr-1 stroke-current"
                  height="1em"
                  width="1em"
                  fill="none"
                  stroke="#141212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="19" x2="5" y1="12" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                All Posts
              </a>
            </Link>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 text-gray-500 text-left">
              Published{' '}
              {format(
                parse(post.date, 'yyyy-MM-dd', new Date()),
                'MMMM d, yyyy'
              )}{' '}
              in {post.tags?.join(', ')}
            </div>

            <PageTitle
              title={post.title}
              subtitle={post.subtitle}
              large={false}
              center={false}
            />
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-4">
          <div>
            <div>
              {readTime && <>{readTime?.text}</>}
              {views && <> &mdash; {views} views</>}
            </div>

            {/* <div>Last updated on</div> */}
          </div>

          <div className="lg:col-span-3">
            <div className="aspect-video max-w-3xl overflow-hidden relative rounded-lg w-full">
              <Image
                src={post.cover as string}
                alt={post.title}
                className="object-center object-cover"
                loader={coverLoader}
                layout="fill"
                placeholder="blur"
                blurDataURL={getBlurUrl(post.cover)}
              />
            </div>

            {post.coverCaption && (
              <ReactMarkdown
                className="caption font-medium leading-tight max-w-3xl py-4 text-gray-500 text-sm"
                remarkPlugins={[smartypants]}
              >
                {post.coverCaption}
              </ReactMarkdown>
            )}

            <article
              ref={ref}
              className={clsx(
                'mt-4 prose lg:prose-lg dark:prose-invert',
                'prose-headings:text-gray-500',
                'prose-a:decoration-2 prose-a:no-underline prose-a:text-brand prose-a:underline-offset-2 hover:prose-a:underline'
              )}
            >
              <ReactMarkdown
                remarkPlugins={[smartypants]}
                className="font-semibold text-gray-500"
              >
                {post.description}
              </ReactMarkdown>

              <NotionRenderer
                blockMap={blockMap}
                hideHeader
                customDecoratorComponents={{
                  a: ({ decoratorValue, children }) => {
                    let href = decoratorValue;
                    if (href.startsWith('/')) {
                      const postWithId = allPosts.find(
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
                        zoomMargin={0}
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
      </div>
    </div>
  );
}
