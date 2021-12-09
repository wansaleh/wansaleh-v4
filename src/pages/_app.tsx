import { MantineProvider } from '@mantine/core';
import withTwindApp from '@twind/next/app';
import { AppProps } from 'next/app';
import 'twind/shim';

import Layout from '@/components/layout/Layout';

import twindConfig from '../../twind.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}

export default withTwindApp(twindConfig, MyApp);
