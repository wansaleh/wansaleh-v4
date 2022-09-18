import { getAllPostsNotionAPI, Post } from '@/lib/notion/posts-notion';

import PageTitle from '@/components/PageTitle';
import PostCard from '@/components/PostCard';
import Seo from '@/components/Seo';

export async function getStaticProps() {
  // const allPosts: Post[] = await getAllPostsNotion();
  const allPosts = await getAllPostsNotionAPI();

  return {
    props: { allPosts },
    revalidate: 1,
  };
}

export default function BlogPage({ allPosts }: { allPosts: Post[] }) {
  // const featuredPost = allPosts.find((post) => Boolean(post.featured)) as Post;
  // const posts = allPosts.filter((post) =>
  //   featuredPost ? featuredPost.id !== post.id : true
  // );

  return (
    <>
      <Seo templateTitle="Blog" />

      <div className="min-h-screen py-24 layout lg:py-40">
        <PageTitle
          title="Blog"
          subtitle="I want to write more. But I'm lazy as hell."
        />

        {/* <div className="mb-8 mt-12 lg:mt-20">
          <FeaturedPostCard post={featuredPost} />
        </div> */}

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
