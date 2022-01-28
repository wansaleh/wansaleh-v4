import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import readingTime, { ReadTimeResults } from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { remarkMdxToc } from 'remark-mdx-toc';
import remarkSlug from 'remark-slug';
import remarkSmartypants from 'remark-smartypants';

const postsDirectory = join(process.cwd(), '_posts');

export type Post = {
  code: string;
  frontmatter: Partial<{
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
    wordCount: number;
  }>;
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source,
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGfm,
        remarkSmartypants,
        remarkSlug,
        remarkMdxToc,
      ];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        // rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ];
      return options;
    },
  });

  return {
    code,
    frontmatter: {
      date: new Date(frontmatter.date),
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug,
      ...frontmatter,
    },
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => getPostBySlug(slug))
  );
  // // sort posts by date in descending order
  // .sort((post1, post2) =>
  //   post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
  // );

  return posts;
}
