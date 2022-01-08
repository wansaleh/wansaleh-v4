import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import smartypants from 'remark-smartypants';

import { getAllPosts, getPostBySlug, Post } from '@/lib/posts';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default function PostPage({ post }: { post: Post }) {
  return (
    <>
      <div className="layout min-h-screen py-20 text-left lg:py-40">
        <div className="max-w-3xl mb-8 mx-auto">
          <h1 className="mb-4 tracking-tight">{post.title}</h1>

          <div className="text-gray-500 text-xl">
            {format(post.date, 'MMMM dd, yyyy')} &mdash;{' '}
            {post.readingTime?.text} &mdash; {post.tags.join(', ')}
          </div>
        </div>

        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.title} className="rounded-xl" />
          {post.coverCaption && (
            <ReactMarkdown
              className="caption font-medium leading-tight mt-2 text-gray-500 text-xs"
              remarkPlugins={[smartypants]}
            >
              {post.coverCaption}
            </ReactMarkdown>
          )}
        </div>

        <ReactMarkdown
          className="backdrop-blur-md bg-gray-500 bg-opacity-10 content max-w-4xl mx-auto p-6 prose rounded-xl lg:p-16 lg:prose-xl dark:prose-dark"
          remarkPlugins={[smartypants]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </>
  );
}
