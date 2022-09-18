import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import slugify from 'slugify';

function addSlug(item) {
  const slug = slugify(item.value, { strict: true, lower: true });
  if (item.children) {
    const children = item.children.map((child) => addSlug(child));
    return { ...item, slug, children };
  }
  return { ...item, slug };
}

export default function useMDX(code: string) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  // const { toc: _toc } = useMemo(() => getMDXExport(code), [code]);
  // const toc = useMemo(() => _toc.map(addSlug), [_toc]);

  return { Component };
}
