import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/posts-notion';

export default function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <div className="border-2 border-current duration-300 grid grid-cols-1 group group h-full link-overlay link-overlay relative transition w-full lg:grid-cols-2 hover:shadow-solid">
      <div className="aspect-video relative lg:aspect-square">
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

      <div className="border-current border-t-2 flex flex-col justify-end p-8 lg:border-l-2 lg:border-t-0">
        {!post.published && (
          <div className="font-bold mb-2 text-red-500">Unpublished</div>
        )}

        <h2 className="font-bold max-w-xl mb-4 text-3xl tracking-tighter transition lg:text-4xl group-hover:text-brand">
          <Link href={`/blog/${post.slug}`}>
            <a className="link">{post.title}</a>
          </Link>
        </h2>

        <div className="font-semibold text-gray-500/80 text-xl">
          {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}
          {/* {' '}
          &mdash; {post.readingTime?.text} */}
        </div>

        <p className="leading-relaxed max-w-xl mt-4 text-xl">
          {post.description}
        </p>
      </div>
    </div>
  );
}
