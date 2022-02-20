import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import '@/styles/globals.css';
import 'react-medium-image-zoom/dist/styles.css';

import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
