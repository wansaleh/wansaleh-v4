import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle="Not Found" />

      <main>
        <section>
          <div className="layout flex flex-col justify-center items-center min-h-screen text-center">
            <h1 className="mt-8">😩 Page Not Found</h1>
            <UnstyledLink className="mt-4" href="/">
              Back to Home
            </UnstyledLink>
          </div>
        </section>
      </main>
    </>
  );
}
