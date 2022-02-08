import { getAllPostsNotion, Post } from '@/lib/posts-notion';

import FeaturedPostCard from '@/components/FeaturedPostCard';
import PageTitle from '@/components/PageTitle';
import PostCard from '@/components/PostCard';
import Seo from '@/components/Seo';

export async function getStaticProps() {
  const allPosts: Post[] = await getAllPostsNotion();

  return {
    props: { allPosts },
    revalidate: 1,
  };
}

export default function BlogPage({ allPosts }: { allPosts: Post[] }) {
  const featuredPost = allPosts.find((post) => Boolean(post.featured)) as Post;
  const posts = allPosts.filter((post) =>
    featuredPost ? featuredPost.id !== post.id : true
  );

  return (
    <>
      <Seo templateTitle="Blog" />

      <div className="layout max-w-5xl min-h-screen py-24 lg:py-40">
        <PageTitle
          title="Blog"
          subtitle="I want to write more. But I'm lazy as hell."
        />

        <div className="mt-12 lg:mt-20">
          <FeaturedPostCard post={featuredPost} />
        </div>

        <div className="gap-10 grid grid-cols-1 w-full lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
