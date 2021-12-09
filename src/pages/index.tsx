import Link from 'next/link';

import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <Seo />

      <main>
        <section>
          <div className="layout flex flex-col justify-center items-center min-h-screen font-extralight text-center">
            <h1 className="font-sans font-light tracking-tighter">
              <a href="https://diskograf.com/wansaleh">Music</a> &amp;{' '}
              <Link href="/web">
                <a>Code</a>
              </Link>
              <br />
              <span className="font-extralight">by Wan Saleh</span>
            </h1>
            {/* <h2>Producer &amp; web developer from Malaysia.</h2> */}
          </div>
        </section>
      </main>
    </>
  );
}
