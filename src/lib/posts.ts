import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import readingTime, { ReadTimeResults } from 'reading-time';

const postsDirectory = join(process.cwd(), '_posts');

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  cover: string;
  coverCaption?: string;
  date: Date;
  tags: string[];
  published: boolean;
  featured: boolean;
  content: string;
  readingTime: ReadTimeResults;
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    author: data.author,
    cover: data.cover,
    coverCaption: data.coverCaption || null,
    date: data.date,
    tags: data.tags,
    published: data.published,
    featured: data.featured,
    content,
    readingTime: readingTime(content),
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts as Post[];
}
