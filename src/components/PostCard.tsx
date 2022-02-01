import { format, parse } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { coverLoader, getBlurUrl } from '@/lib/images';
import { Post } from '@/lib/posts-notion';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="backdrop-blur-md bg-gray-500/10 duration-300 flex flex-col group link-overlay p-6 relative rounded-xl transition lg:p-6 dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-brand hover:ring-offset-2 hover:ring-offset-gray-100">
      <h2 className="font-semibold mb-2 text-2xl tracking-tight lg:text-3xl">
        <Link href={`/blog/${post.slug}`}>
          <a className="link">{post.title}</a>
        </Link>
      </h2>

      <div className="text-gray-500 text-lg">
        {format(parse(post.date, 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy')}{' '}
        {/* &mdash; {post.readingTime?.text} */}
      </div>

      <div className="aspect-[3] my-4 relative">
        <Image
          src={post.cover as string}
          alt={post.title}
          className="object-cover rounded-lg"
          loader={coverLoader}
          // layout="fill"
          width={500}
          height={166.67}
          placeholder="blur"
          blurDataURL={getBlurUrl(post.cover)}
        />
      </div>

      <div className="mt-auto">
        <button type="button" className="flex font-semibold items-center">
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
  );
}
