import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/posts-notion';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border-2 border-current duration-300 group h-full link-overlay relative transition w-full hover:shadow-solid">
      <div className="aspect-[500/150] border-b-2 border-current relative">
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

      <div className="p-4">
        {!post.published && (
          <div className="font-bold mb-2 text-red-500">Unpublished</div>
        )}

        <h2 className="font-semibold mb-0 text-xl lg:text-2xl">
          <Link href={`/blog/${post.slug}`}>
            <a className="link transition group-hover:text-brand">
              {post.title}
            </a>
          </Link>
        </h2>

        <div className="font-semibold text-gray-500 text-lg">
          {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}{' '}
        </div>
      </div>
    </div>
  );
}
