import "bootstrap/dist/css/bootstrap.css"
import '@/styles/globals.css'
import Layout from "@/components/layouts/Layout";
import { Suspense } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Suspense>
    </>
  )
}

