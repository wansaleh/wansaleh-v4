import * as React from 'react';

import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle="Not Found" />

      <main>
        <section>
          <div className="layout flex flex-col justify-center items-center min-h-screen text-center">
            <h1 className="mt-8">😩 Page Not Found</h1>
            <CustomLink className="mt-4" href="/">
              Back to Home
            </CustomLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
