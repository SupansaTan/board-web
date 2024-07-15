import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";
import MainLayout from "@/components/main-layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/styles.scss";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutPages = ["/sign-in"];
  const isLayoutNeeded = !noLayoutPages.includes(router.pathname);

  return (
    <SSRProvider>
      {isLayoutNeeded ? (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </SSRProvider>
  );
}
