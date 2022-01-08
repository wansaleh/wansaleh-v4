import { getAllPosts, Post } from '@/lib/posts';

import PageTitle from '@/components/PageTitle';
import PostCard from '@/components/PostCard';
import Seo from '@/components/Seo';

export async function getStaticProps() {
  const allPosts: Post[] = getAllPosts();

  return {
    props: { allPosts },
  };
}

export default function BlogPage({ allPosts }: { allPosts: Post[] }) {
  return (
    <>
      <Seo templateTitle="Posts" />

      <div className="layout min-h-screen py-20 lg:py-40">
        <PageTitle
          title="Blog"
          subtitle="I want to write. But I'm lazy as hell. &mdash; Wan Saleh"
        />

        <div className="gap-8 grid grid-cols-1 w-full lg:grid-cols-2">
          {allPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
