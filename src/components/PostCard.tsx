import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/posts-notion';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="duration-300 group h-full link-overlay relative transition w-full">
      <div className="aspect-[2] border-2 border-current overflow-hidden relative rounded-lg transition group-hover:shadow-solid">
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
          <div className="font-bold mb-2 text-red-500">Unpublished</div>
        )}

        <div className="font-bold mb-1 text-gray-500 text-xs tracking-widest uppercase">
          {post.tags?.join(', ')}
        </div>

        <h2 className="!leading-tight font-semibold mb-1 text-lg lg:text-xl">
          <Link href={`/blog/${post.slug}`}>
            <a className="link transition group-hover:text-brand">
              {post.title}
            </a>
          </Link>
        </h2>

        <div className="font-semibold text-base text-gray-500">
          {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}
        </div>

        <div className="font-light mt-2 text-gray-500 text-sm">
          {post.subtitle}
        </div>
      </div>
    </div>
  );
}
