import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo2 from '../images/Logo2';
import ThemeSelect from '../ThemeSelect';

export default function Nav() {
  const router = useRouter();

  return (
    <div className="absolute flex items-center justify-between left-0 p-6 right-0 top-0 z-50">
      {router.pathname !== '/' && (
        <Link href="/">
          <a className="flex font-semibold gap-2 group items-center leading-tight text-sm lg:text-base">
            <span className="duration-300 transition group-hover:text-brand">
              <Logo2 className="h-[2em]" />
            </span>
            <span className="sr-only md:not-sr-only">By Wan Saleh</span>
          </a>
        </Link>
      )}

      <div className="flex-1" />

      <ul className="flex font-semibold items-center text-sm lg:gap-1">
        <li>
          <Link href="/discography">
            <a
              className={clsx(
                router.pathname.startsWith('/discography') && 'active'
              )}
            >
              Discography
            </a>
          </Link>
        </li>
        <li>
          <Link href="/code">
            <a
              className={clsx(router.pathname.startsWith('/code') && 'active')}
            >
              Code
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a
              className={clsx(router.pathname.startsWith('/blog') && 'active')}
            >
              Blog
            </a>
          </Link>
        </li>
        <li className="ml-2">
          <ThemeSelect />
        </li>

        <style jsx>{`
          a {
            @apply mx-2 relative;
          }
          a:after {
            content: '';
            @apply w-4 h-1 rounded-full bg-brand absolute -top-1.5 left-1/2 transform -translate-x-1/2 opacity-0 transition;
          }
          a:hover:after,
          a.active:after {
            @apply opacity-100;
          }
        `}</style>
      </ul>
    </div>
  );
}
