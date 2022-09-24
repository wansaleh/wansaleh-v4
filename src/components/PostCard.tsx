import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/notion/posts-notion';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="link-overlay group relative h-full w-full transition duration-300">
      <div className="relative aspect-[2] overflow-hidden rounded-md transition">
        <Image
          src={post.cover as string}
          alt={post.title}
          className="object-cover"
          loader={coverLoader}
          layout="fill"
          // width={500}
          // height={150}
          placeholder="blur"
          blurDataURL={getBlurUrl(post.cover)}
        />
      </div>

      <div className="mt-4">
        {!post.published && (
          <div className="mb-2 font-bold text-red-500">Unpublished</div>
        )}

        <div className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
          {post.tags?.join(', ')}
        </div>

        <h2 className="mb-1 text-lg font-semibold !leading-tight lg:text-xl">
          <Link href={`/blog/${post.slug}`}>
            <a className="link transition group-hover:text-brand">
              {post.title}
            </a>
          </Link>
        </h2>

        <div className="text-base font-semibold text-gray-500">
          {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}
        </div>

        <div className="mt-2 text-base font-normal text-gray-500">
          {post.subtitle}
        </div>
      </div>
    </div>
  );
}
