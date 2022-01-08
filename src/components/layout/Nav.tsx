import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo2 from '../images/Logo2';
import ThemeSelect from '../ThemeSelect';

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

      <ul className="flex font-semibold items-center text-sm lg:gap-1">
        <li>
          <Link href="/discography">
            <a
              className={clsx(
                'border-2 border-transparent border-y-0 duration-200 px-2 py-0.5 rounded-md transition hover:text-brand',
                router.pathname === '/discography' && '!border-brand'
              )}
            >
              Discography
            </a>
          </Link>
        </li>
        <li>
          <Link href="/code">
            <a
              className={clsx(
                'border-2 border-transparent border-y-0 duration-200 px-2 py-0.5 rounded-md transition hover:text-brand',
                router.pathname === '/code' && '!border-brand'
              )}
            >
              Code
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a
              className={clsx(
                'border-2 border-transparent border-y-0 duration-200 px-2 py-0.5 rounded-md transition hover:text-brand',
                router.pathname.startsWith('/blog') && '!border-brand'
              )}
            >
              Blog
            </a>
          </Link>
        </li>
        <li className="ml-2">
          <ThemeSelect />
        </li>
      </ul>
    </div>
  );
}
