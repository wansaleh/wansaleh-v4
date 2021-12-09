import { tw } from 'twind';

import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <Seo />

      <main>
        <section>
          <div
            className={tw`layout flex flex-col justify-center items-center min-h-screen text-6xl font-extralight text-center`}
          >
            <h1>Music &amp; Code.</h1>
            <h2>Producer. Developer.</h2>
          </div>
        </section>
      </main>
    </>
  );
}
