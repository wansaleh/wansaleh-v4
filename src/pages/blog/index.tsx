import { getAllPosts, Post } from '@/lib/posts';

import FeaturedPostCard from '@/components/FeaturedPostCard';
import PageTitle from '@/components/PageTitle';
import PostCard from '@/components/PostCard';
import Seo from '@/components/Seo';

export async function getStaticProps() {
  const allPosts: Post[] = await getAllPosts();

  return {
    props: { allPosts },
  };
}

export default function BlogPage({ allPosts }: { allPosts: Post[] }) {
  const featuredPost = allPosts[0];
  const posts = allPosts.slice(1);

  return (
    <>
      <Seo templateTitle="Blog" />

      <div className="layout max-w-6xl min-h-screen py-24 lg:py-40">
        <PageTitle
          title="Blog"
          subtitle="I want to write more. But I'm lazy as hell."
        />

        <div className="my-20">
          <FeaturedPostCard post={featuredPost} />
        </div>

        <div className="gap-8 grid grid-cols-1 w-full lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
