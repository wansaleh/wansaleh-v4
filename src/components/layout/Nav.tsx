import Link from 'next/link';

import Logo from '../images/Logo';

export default function Nav() {
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
            <a className="hover:(bg-black text-white) rounded-md px-1 py-0.5">
              Discography
            </a>
          </Link>
        </li>
        <li>
          <Link href="/web">
            <a className="hover:(bg-black text-white) rounded-md px-1 py-0.5">
              Web
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
