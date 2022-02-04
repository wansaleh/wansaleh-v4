import { orderBy } from 'lodash-es';
import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { remarkMdxToc } from 'remark-mdx-toc';
import remarkSlug from 'remark-slug';
import remarkSmartypants from 'remark-smartypants';

// import { n2m } from './notion';

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

  // const mdBlocks = await n2m.pageToMarkdown(post.id);
  // const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    post,
    blockMap: data,
    // mdString,
    posts,
  };
}

export async function getPostMDX(mdString: string) {
  return bundleMDX({
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
