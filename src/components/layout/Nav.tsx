import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo2 from '../images/Logo2';

export default function Nav() {
  const router = useRouter();

  return (
    <div className="absolute flex items-center justify-between left-0 p-6 right-0 top-0 z-50">
      <Link href="/">
        <a className="flex font-semibold gap-2 group items-center leading-tight text-sm lg:text-base">
          <span className="duration-300 transition group-hover:text-brand">
            <Logo2 className="h-[2em]" />
          </span>
          <span className="sr-only md:not-sr-only">By Wan Saleh</span>
        </a>
      </Link>

      <ul className="flex font-semibold space-x-4 text-sm tracking-tight">
        <li>
          <Link href="/discography">
            <a className="border-2 border-transparent px-1 py-0 rounded-md hover:border-black">
              Discography
            </a>
          </Link>
        </li>
        <li>
          <Link href="/web">
            <a
              className={clsx(
                'border-2 border-transparent px-1 py-0 rounded-md hover:border-black',
                router.pathname === '/web' && 'border-black'
              )}
            >
              Web
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a
              className={clsx(
                'border-2 border-transparent duration-200 px-1 py-0 rounded-md transition hover:border-current',
                router.pathname === '/blog' && '!border-brand'
              )}
            >
              Blog
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
