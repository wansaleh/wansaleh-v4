import { Client } from '@notionhq/client';
import { bundleMDX } from 'mdx-bundler';
import { NotionToMarkdown } from 'notion-to-md';
import readingTime, { ReadTimeResults } from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { remarkMdxToc } from 'remark-mdx-toc';
import remarkSlug from 'remark-slug';
import remarkSmartypants from 'remark-smartypants';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

export type Post = {
  id: string;
  title: string;
  slug: string;
  cover: string;
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
  readingTime?: ReadTimeResults;
  wordCount?: number;
};

export async function getPostBySlug(slug: string) {
  const posts = await getAllPostsNotion();
  const post = posts.find((p) => p.slug === slug) as Post;

  const mdblocks = await n2m.pageToMarkdown(post.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const { code } = await bundleMDX({
    source: mdString,
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

  post.readingTime = readingTime(code);

  return { post, code };
}

export async function getAllPostsNotion(): Promise<Post[]> {
  const posts = await fetch(
    'https://notion-api.splitbee.io/v1/table/c381256bf8ab4e4cbf87b8d2eec87fb1'
  ).then((res) => res.json());

  return posts;
}
