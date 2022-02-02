import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/posts-notion';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="duration-300 flex flex-col group link-overlay mb-10 relative">
      <div className="my-4 relative">
        <Image
          src={post.cover as string}
          alt={post.title}
          className="object-cover rounded-lg"
          loader={coverLoader}
          // layout="fill"
          width={500}
          height={150}
          placeholder="blur"
          blurDataURL={getBlurUrl(post.cover)}
        />
      </div>

      {!post.published && <div className="font-bold mb-2">Unpublished</div>}

      <h2 className="font-semibold mb-0 text-2xl tracking-tight lg:text-3xl">
        <Link href={`/blog/${post.slug}`}>
          <a className="link transition group-hover:text-brand">{post.title}</a>
        </Link>
      </h2>

      <div className="font-semibold text-gray-500 text-lg">
        {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}{' '}
      </div>
    </div>
  );
}
