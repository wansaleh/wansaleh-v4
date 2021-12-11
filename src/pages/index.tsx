import Link from 'next/link';

import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <Seo />

      <h1 className="lg:text-7xl font-sans text-5xl font-semibold tracking-tighter">
        <span>
          <a
            href="https://diskograf.com/wansaleh"
            // className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600"
          >
            Music
          </a>{' '}
          &amp;{' '}
          <Link href="/web">
            <a
            // className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-cyan-600"
            >
              Code
            </a>
          </Link>
        </span>
        <span className="block font-extralight">by Wan Saleh</span>
      </h1>
      {/* <h2>Producer &amp; web developer from Malaysia.</h2> */}
    </>
  );
}
