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
import { LoadingProvider } from "@/utils/context/LoadingContext";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutPages = ["/sign-in"];
  const isLayoutNeeded = !noLayoutPages.includes(router.pathname);

  return (
    <SSRProvider>
      {isLayoutNeeded ? (
        <RootStateProvider>
          <LoadingProvider>
            <MainLayout>
              <Component {...pageProps} />
              <ToastComponent />
            </MainLayout>
          </LoadingProvider>
        </RootStateProvider>
      ) : (
        <RootStateProvider>
          <LoadingProvider>
            <div className="h-100">
              <Component {...pageProps} />
            </div>
            <ToastComponent />
          </LoadingProvider>
        </RootStateProvider>
      )}
    </SSRProvider>
  );
}
