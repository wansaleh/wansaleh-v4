import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/notion/posts-notion';

export default function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <div className="link-overlay link-overlay hover:shadow-solid group group relative grid h-full w-full grid-cols-1 overflow-hidden rounded-lg border-2 border-current transition duration-300 lg:grid-cols-2">
      <div className="relative aspect-video lg:aspect-square">
        <Image
          src={post.cover}
          alt={post.title}
          className="object-cover"
          loader={coverLoader}
          layout="fill"
          // width={550}
          // height={550}
          placeholder="blur"
          blurDataURL={getBlurUrl(post.cover)}
        />
      </div>

      <div className="flex flex-col justify-end border-t-2 border-current p-8 lg:border-l-2 lg:border-t-0">
        {!post.published && (
          <div className="mb-2 font-bold text-red-500">Unpublished</div>
        )}

        <h2 className="mb-4 max-w-xl text-3xl font-bold tracking-tighter transition group-hover:text-brand lg:text-4xl">
          <Link href={`/blog/${post.slug}`}>
            <a className="link">{post.title}</a>
          </Link>
        </h2>

        <div className="text-xl font-semibold text-gray-500/80">
          {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}
          {/* {' '}
          &mdash; {post.readingTime?.text} */}
        </div>

        <p className="mt-4 max-w-xl text-xl leading-relaxed">
          {post.description}
        </p>
      </div>
    </div>
  );
}
