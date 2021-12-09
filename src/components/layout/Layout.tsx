import * as React from 'react';

import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <Nav />

      {children}

      <Footer />
    </>
  );
}
