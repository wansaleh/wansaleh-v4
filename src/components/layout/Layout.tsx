import { ReactNode } from 'react';

import Footer from './Footer';
import Nav from './Nav';
import Seo from '../Seo';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Seo />

      <Nav />

      <main className="flex flex-col font-normal items-center justify-center min-h-screen relative">
        {children}

        <Footer />
      </main>
    </>
  );
}
