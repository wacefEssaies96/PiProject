import "bootstrap/dist/css/bootstrap.css"
import '@/styles/globals.css'
import Layout from "@/components/layouts/Layout";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

