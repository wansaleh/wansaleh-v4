import Link from 'next/link';

import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <Seo />

      <div className="absolute -z-10 w-[60vw] h-[60vw] rounded-full bg-gradient-to-r p-6 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
        <div className="dark:bg-darkbg bg-lightbg w-full h-full rounded-full" />
      </div>

      <div className="layout text-center">
        <h1 className="lg:text-9xl relative font-sans text-5xl font-semibold tracking-tight">
          <span>
            <Link href="/discography">
              <a>Music</a>
            </Link>
            &amp;
            <Link href="/web">
              <a>Code</a>
            </Link>
          </span>

          <span className="block font-extralight tracking-[-0.075em] mx-auto">
            by Wan Saleh
          </span>
        </h1>
      </div>
    </>
  );
}
