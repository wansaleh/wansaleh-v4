import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '../images/Logo';

export default function Nav() {
  const router = useRouter();

  return (
    <div className="flex absolute top-0 right-0 left-0 justify-between items-center p-6">
      <Link href="/">
        <a>
          <Logo className="h-8" />
        </a>
      </Link>

      <ul className="flex space-x-4 text-sm font-semibold tracking-tight">
        <li>
          <Link href="https://diskograf.com/wansaleh  ">
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
