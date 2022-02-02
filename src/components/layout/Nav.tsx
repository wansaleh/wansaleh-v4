import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo2 from '../images/Logo2';
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
    <div className="absolute flex items-center justify-between layout left-0 p-6 right-0 top-0 z-50">
      {router.pathname !== '/' && (
        <Link href="/">
          <a className="flex font-semibold gap-2 group items-center leading-tight text-base">
            <span className="duration-300 transition group-hover:text-brand">
              <Logo2 className="h-[2em]" />
            </span>
            <span className="sr-only md:not-sr-only">By Wan Saleh</span>
          </a>
        </Link>
      )}

      <div className="flex-1" />

      <ul className="flex font-semibold items-center text-base lg:gap-1">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>
              <a
                className={clsx(
                  'mx-2 relative',
                  'after:-left-2 after:-translate-y-1/2 after:absolute after:bg-brand after:content-[""] after:h-3 after:opacity-0 after:rounded-full after:top-1/2 after:transition after:w-1',
                  'hover:after:opacity-100',
                  router.pathname.startsWith(href) && 'after:opacity-100'
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
