import * as React from 'react';

import Footer from './Footer';
import Nav from './Nav';
import Seo from '../Seo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Seo />

      <Nav />

      <main className="flex relative flex-col justify-center items-center min-h-screen font-normal">
        {children}

        <Footer />
      </main>
    </>
  );
}
