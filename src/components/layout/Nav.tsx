import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo2 from '../images/Logo';
import ThemeSelect from '../ThemeSelect';

const links = [
  {
    href: '/discography',
    label: 'Discography',
  },
  {
    href: '/code',
    label: 'Code',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
];

export default function Nav() {
  const router = useRouter();

  return (
    <div className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between p-6 layout">
      <Link href="/">
        <a className="group flex items-center gap-2 text-base font-semibold leading-tight tracking-tight">
          <span className="transition duration-300 group-hover:text-brand">
            <Logo2 className="h-[2em]" />
          </span>
          <span className="sr-only">By Wan Saleh</span>
        </a>
      </Link>

      <div className="flex-1" />

      <ul className="flex items-center text-base font-semibold leading-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>
              <a
                className={clsx(
                  'relative mx-1 block rounded px-1.5 py-0.5',
                  'hover:bg-darkbg hover:text-lightbg hover:dark:bg-lightbg hover:dark:text-darkbg',
                  router.pathname.startsWith(href) &&
                    'bg-darkbg text-lightbg dark:bg-lightbg dark:text-darkbg'
                )}
              >
                {label}
              </a>
            </Link>
          </li>
        ))}

        <li className="ml-2">
          <ThemeSelect />
        </li>
      </ul>
    </div>
  );
}
