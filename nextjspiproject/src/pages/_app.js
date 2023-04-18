import 'regenerator-runtime/runtime'
import "bootstrap/dist/css/bootstrap.css"
import '@/styles/globals.css'
import Layout from "@/components/layouts/Layout";
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
