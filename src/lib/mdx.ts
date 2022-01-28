import { readFileSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { remarkMdxToc } from 'remark-mdx-toc';
import remarkSlug from 'remark-slug';
import remarkSmartypants from 'remark-smartypants';

export async function getContentBySlug(slug: string) {
  const source = readFileSync(
    join(process.cwd(), 'contents', 'manualsolat', `${slug}.mdx`),
    'utf8'
  );

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
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter,
    },
  };
}
