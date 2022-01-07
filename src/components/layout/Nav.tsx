import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo2 from '../images/Logo2';

export default function Nav() {
  const router = useRouter();

  return (
    <div className="flex absolute top-0 right-0 left-0 justify-between items-center p-6">
      <Link href="/">
        <a className="lg:text-base group flex gap-2 items-center text-sm font-semibold leading-tight">
          <span className="group-hover:text-brand transition duration-300">
            <Logo2 className="h-[2em]" />
          </span>
          <span className="md:not-sr-only sr-only">By Wan Saleh</span>
        </a>
      </Link>

      <ul className="flex space-x-4 text-sm font-semibold tracking-tight">
        <li>
          <Link href="/discography">
            <a className="hover:border-black py-0 px-1 rounded-md border-2 border-transparent">
              Discography
            </a>
          </Link>
        </li>
        <li>
          <Link href="/web">
            <a
              className={clsx(
                'hover:border-black py-0 px-1 rounded-md border-2 border-transparent',
                router.pathname === '/web' && 'border-black'
              )}
            >
              Web
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
