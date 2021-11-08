import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className="bg-dark">
          <div className="layout flex flex-col justify-center items-center min-h-screen text-center text-white">
            <h1>Wan Saleh v4</h1>

            <footer className="absolute bottom-2 text-gray-500">
              © {new Date().getFullYear()} By{' '}
              <CustomLink href="https://theodorusclarence.com?ref=tsnextstarter">
                Wan Saleh
              </CustomLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

/**
 * Default info that you should change:
 * components/Seo.tsx
 * next-sitemap.js
 * public/favicon
 *
 * Please refer to the README.md
 */
