import { orderBy } from 'lodash-es';

export type Post = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  coverCaption?: string;
  subtitle: string;
  description: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  date: string;
  author: {
    id: string;
    firstName: string;
    lastLame: string;
    fullName: string;
    profilePhoto: string;
  }[];
};

export async function getPostBySlug(slug: string) {
  const posts = await getAllPostsNotion();
  const post = posts.find((p) => p.slug === slug) as Post;

  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then((res) => res.json());

  return { post, blockMap: data };
}

export async function getAllPostsNotion(): Promise<Post[]> {
  const posts: Post[] = await fetch(
    'https://notion-api.splitbee.io/v1/table/c381256bf8ab4e4cbf87b8d2eec87fb1'
  ).then((res) => res.json());

  return orderBy(posts, 'date', 'desc')
    .map((p) => ({ ...p, featured: p.featured ?? false }))
    .filter((p) =>
      process.env.NODE_ENV === 'development' ? true : p.published
    );
}
