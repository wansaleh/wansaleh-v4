import clsx from 'clsx';
import { format, formatDistanceStrict, parse, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Zoom from 'react-medium-image-zoom';
import { NotionRenderer } from 'react-notion';
import { readingTime } from 'reading-time-estimator';
import smartypants from 'remark-smartypants';
import useSWR from 'swr';

import { coverLoader, getBlurUrl } from '@/lib/images';
import {
  getAllPostsNotion,
  getPostBySlug,
  Post,
} from '@/lib/notion/posts-notion';

import NonSSR from '@/components/NonSSR';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockMap: any;
  allPosts: Post[];
}) {
  const { theme } = useTheme();
  const [readTime, setReadTime] = useState<{
    minutes: number;
    words: number;
    text: string;
  } | null>(null);
  const ref = useRef<HTMLElement>(null);

  const { data: views } = useSWR(
    post.slug ? `/api/postviews?slug=${post.slug}` : null,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (ref.current?.textContent) {
      setReadTime(readingTime(ref.current.textContent));
    }

    return () => {
      fetch(`/api/postviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'increment', slug: post.slug }),
      });
    };
  }, [post.slug]);

  return (
    <div className="min-h-screen w-full">
      <Seo templateTitle={`${post.title} | Blog`} />

      <div className="mb-32 mt-24 layout">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
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
            <div className="mb-4 text-left text-gray-500">
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <NonSSR>
              <div className="font-semibold">
                {readTime && <>{readTime.text}</>}
                <span> &middot; </span>
                {views ? (
                  <>{views} views</>
                ) : (
                  <svg
                    className="-mt-0.5 inline-block h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </div>
            </NonSSR>

            <div>
              Last updated{' '}
              {formatDistanceStrict(parseISO(post.edited), new Date())} ago
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-lg">
              <Image
                src={post.cover as string}
                alt={post.title}
                className="object-cover object-center"
                loader={coverLoader}
                layout="fill"
                placeholder="blur"
                blurDataURL={getBlurUrl(post.cover)}
              />
            </div>

            {post.coverCaption && (
              <ReactMarkdown
                className="caption max-w-3xl py-4 text-sm font-medium leading-tight text-gray-500"
                remarkPlugins={[smartypants]}
              >
                {post.coverCaption}
              </ReactMarkdown>
            )}

            <article
              ref={ref}
              className={clsx(
                'prose mt-4 dark:prose-invert lg:prose-lg',
                'prose-headings:text-gray-500',
                'prose-a:text-brand prose-a:no-underline prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:underline'
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
                  a: ({ decoratorValue, renderComponent }) => {
                    let href = decoratorValue;
                    if (href.startsWith('/')) {
                      const postWithId = allPosts.find(
                        (p) => p.id.replace(/-/g, '') === href.slice(1)
                      );
                      href = postWithId ? postWithId.slug : href;
                    }

                    return (
                      <Link href={href}>
                        <a className="notion-link">{renderComponent()}</a>
                      </Link>
                    );
                  },
                }}
                customBlockComponents={{
                  image: ({ renderComponent }) => {
                    return (
                      <Zoom
                        zoomMargin={0}
                        // overlayBgColorEnd={theme === 'dark' ? 'black' : 'white'}
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
