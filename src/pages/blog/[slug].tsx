import { format } from 'date-fns';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import smartypants from 'remark-smartypants';

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
      <Seo templateTitle={post.title + ' | Blog'} />

      <div className="layout min-h-screen py-24 text-left lg:py-40">
        <PageTitle title={post.title} large={false} />
        <div className="-mt-4 mb-8 mx-auto text-center text-gray-500 text-xl">
          {format(post.date, 'MMMM dd, yyyy')} &mdash; {post.readingTime?.text}{' '}
          &mdash; {post.tags.join(', ')}
        </div>

        <div className="mb-8">
          <div className="aspect-video relative">
            <Image
              src={post.cover}
              alt={post.title}
              className="object-cover rounded-xl"
              loader={coverLoader}
              layout="fill"
              placeholder="blur"
              blurDataURL={getBlurUrl(post.cover)}
            />
          </div>
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
          className="backdrop-blur-md bg-gray-500 bg-opacity-10 content max-w-4xl mx-auto p-6 prose prose-a:decoration-1 prose-a:decoration-slate-500 prose-a:transition rounded-xl lg:p-16 lg:prose-xl dark:prose-invert hover:prose-a:decoration-2 hover:prose-a:decoration-current"
          remarkPlugins={[smartypants]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </>
  );
}
