import { orderBy } from 'lodash-es';

import { getDatabase } from './notion';

import { NotionItem } from '@/types/notion-item';

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
  author: any;
  edited: string;
};

export async function getPostBySlug(slug: string) {
  const posts = await getAllPostsNotionAPI();
  const post = posts.find((p) => p.slug === slug) as Post;

  const blockMap = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then((res) => res.json());

  return {
    post,
    blockMap,
    posts,
  };
}

export async function getAllPostsNotion(): Promise<Post[]> {
  const posts: Post[] = await fetch(
    'https://notion-api.splitbee.io/v1/table/c381256bf8ab4e4cbf87b8d2eec87fb1'
  ).then((res) => res.json());

  return orderBy(posts, 'date', 'desc')
    .map((post) => ({
      ...post,
      featured: post.featured ?? false,
      cover: Array.isArray(post.cover) ? post.cover[0].rawUrl : post.cover,
    }))
    .filter((post) =>
      process.env.NODE_ENV === 'development' ? true : !!post.published
    );
}

export async function getAllPostsNotionAPI(): Promise<Post[]> {
  const posts = await getDatabase('c381256bf8ab4e4cbf87b8d2eec87fb1');

  return posts.map((post: any) => {
    const properties = post.properties;

    return {
      id: post.id,
      title: properties.title.title.map((txt) => txt.plain_text).join(''),
      slug: properties.slug.rich_text.map((txt) => txt.plain_text).join(''),
      cover: properties.cover.files[0].external.url,
      coverCaption: properties.coverCaption.rich_text
        .map((txt) => txt.plain_text)
        .join(''),
      subtitle: properties.subtitle.rich_text
        .map((txt) => txt.plain_text)
        .join(''),
      description: properties.description.rich_text
        .map((txt) => txt.plain_text)
        .join(''),
      featured: properties.featured.checkbox,
      published: properties.published.checkbox,
      tags: properties.tags.multi_select.map((tag) => tag.name),
      date: properties.date.date.start,
      author: properties.author.people[0],
      edited: post.last_edited_time,
    };
  });

  // return orderBy(posts, 'date', 'desc')
  //   .map((post) => ({
  //     ...post,
  //     featured: post.featured ?? false,
  //     cover: Array.isArray(post.cover) ? post.cover[0].rawUrl : post.cover,
  //   }))
  //   .filter((post) =>
  //     process.env.NODE_ENV === 'development' ? true : !!post.published
  //   );
}
