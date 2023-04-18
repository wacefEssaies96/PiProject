import '@/styles/globals.css';

import Layout from '@/components/layouts/Layout';
import Script from 'next/script';

import { StoreProvider } from '@/utils/Store';

export default function App({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </>
  );
}
