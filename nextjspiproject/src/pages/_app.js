import "bootstrap/dist/css/bootstrap.css"
import '@/styles/globals.css'
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layouts/Layout";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, [router.events]);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
