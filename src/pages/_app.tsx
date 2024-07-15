import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/styles.scss";
import MainLayout from "@/components/main-layout";
import ToastComponent from "@/components/toast";

import { config } from "@fortawesome/fontawesome-svg-core";
import { RootStateProvider } from "@/utils/context/RootStateContext";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutPages = ["/sign-in"];
  const isLayoutNeeded = !noLayoutPages.includes(router.pathname);

  return (
    <SSRProvider>
      {isLayoutNeeded ? (
        <RootStateProvider>
          <MainLayout>
            <Component {...pageProps} />
            <ToastComponent />
          </MainLayout>
        </RootStateProvider>
      ) : (
        <RootStateProvider>
          <Component {...pageProps} />
          <ToastComponent />
        </RootStateProvider>
      )}
    </SSRProvider>
  );
}
