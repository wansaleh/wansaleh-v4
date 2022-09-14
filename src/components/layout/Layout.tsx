import { ReactNode } from 'react';

import Footer from './Footer';
import Nav from './Nav';
import Seo from '../Seo';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Seo />

      <Nav />

      <main className="relative flex min-h-screen flex-col items-center justify-center font-normal">
        {children}

        <Footer />
      </main>
    </>
  );
}
