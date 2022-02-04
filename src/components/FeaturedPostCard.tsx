import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/posts-notion';

export default function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <div className="backdrop-blur-md duration-300 gap-10 grid grid-cols-1 group link-overlay mb-20 relative rounded-xl transition lg:grid-cols-2">
      <div className="aspect-video relative lg:aspect-square">
        <Image
          src={post.cover}
          alt={post.title}
          className="object-cover rounded-xl"
          loader={coverLoader}
          layout="fill"
          // width={550}
          // height={550}
          placeholder="blur"
          blurDataURL={getBlurUrl(post.cover)}
        />
      </div>

      <div className="flex flex-col justify-end">
        {!post.published && <div className="font-bold mb-2">Unpublished</div>}

        <h2 className="font-bold max-w-xl mb-4 text-4xl tracking-tight transition lg:text-5xl group-hover:text-brand">
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

        <div className="mt-auto">
          <button
            type="button"
            className="flex font-semibold items-center mt-10 text-xl"
          >
            Read Article
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 inline-block ml-2 stroke-current transition group-hover:transform group-hover:translate-x-2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 16 16 12 12 8" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
