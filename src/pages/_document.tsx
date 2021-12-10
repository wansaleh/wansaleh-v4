import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/inter-ui/3.19.3/inter.min.css"
            integrity="sha512-8vEtrrc40OAQaCUaqVjNMQtQEPyNtllVG1RYy6bGEuWQkivCBeqOzuDJPPhD+MO6y6QGLuQYPCr8Nlzu9lTYaQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@160..700&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://api.fontshare.com/css?f[]=clash-display@1&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
