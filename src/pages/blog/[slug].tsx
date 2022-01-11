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

      <div className="layout lg:py-40 py-24 min-h-screen text-left">
        <PageTitle title={post.title} large={false} />
        <div className="mx-auto mb-8 -mt-4 text-xl text-center text-gray-500">
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
              className="caption mt-2 text-xs font-medium leading-tight text-gray-500"
              remarkPlugins={[smartypants]}
            >
              {post.coverCaption}
            </ReactMarkdown>
          )}
        </div>

        <ReactMarkdown
          className="backdrop-blur-md content prose prose-a:decoration-1 prose-a:decoration-slate-500 prose-a:transition lg:p-16 lg:prose-xl dark:prose-invert hover:prose-a:decoration-2 hover:prose-a:decoration-current p-6 mx-auto max-w-4xl bg-gray-500 bg-opacity-10 rounded-xl"
          remarkPlugins={[smartypants]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </>
  );
}
