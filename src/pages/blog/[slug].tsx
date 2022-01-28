import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import smartypants from 'remark-smartypants';

import useMDX from '@/lib/hooks/use-mdx';
import { coverLoader, getBlurUrl } from '@/lib/images';
import { getAllPosts, getPostBySlug, Post } from '@/lib/posts';

import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.frontmatter.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default function PostPage({ post }: { post: Post }) {
  const [views, setViews] = useState(null);
  const { Component, toc } = useMDX(post.code);

  useEffect(() => {
    async function loadViews() {
      const views = await fetch(
        `/api/post-views?slug=${post.frontmatter.slug}`
      ).then((res) => res.json());

      setViews(views);
    }

    loadViews();
  }, [post.frontmatter.slug]);

  return (
    <>
      <Seo templateTitle={`${post.frontmatter.title} | Blog`} />

      <div className="layout pt-24 text-left lg:pt-40">
        <PageTitle title={post.frontmatter.title as string} large={false} />
        <div className="-mt-4 mb-8 mx-auto text-center text-gray-500 text-xl">
          {format(post.frontmatter.date as Date, 'MMMM dd, yyyy')} &mdash;{' '}
          {post.frontmatter.readingTime?.text} &mdash;{' '}
          {post.frontmatter.tags?.join(', ')}
          {views && <> &mdash; {views} views</>}
        </div>
      </div>

      <div className="layout max-w-7xl mb-8 w-full">
        <div className="aspect-video relative">
          <Image
            src={post.frontmatter.cover as string}
            alt={post.frontmatter.title}
            className="object-cover rounded-xl"
            loader={coverLoader}
            layout="fill"
            placeholder="blur"
            blurDataURL={getBlurUrl(post.frontmatter.cover)}
          />
        </div>
        {post.frontmatter.coverCaption && (
          <ReactMarkdown
            className="caption font-medium leading-tight p-4 text-center text-gray-500 text-sm"
            remarkPlugins={[smartypants]}
          >
            {post.frontmatter.coverCaption}
          </ReactMarkdown>
        )}
      </div>

      <div className="pb-24 lg:pb-40">
        <article className="backdrop-blur-md bg-gray-500 bg-opacity-10 content max-w-4xl mx-auto p-6 prose prose-a:decoration-1 prose-a:decoration-slate-500 prose-a:transition rounded-xl lg:p-16 lg:prose-xl dark:prose-invert hover:prose-a:decoration-2 hover:prose-a:decoration-current">
          <Component />
        </article>
      </div>
    </>
  );
}
