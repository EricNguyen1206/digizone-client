import type { AppProps } from "next/app";
import { Container, SSRProvider } from "react-bootstrap";
import { ToastProvider } from "react-toast-notifications";
import NextNProgress from "nextjs-progressbar";

import TopHead from "@/components/shared/TopHead";
import Heading from "@/components/shared/Heading";
import Footer from "@/components/shared/Footer";

import { Provider } from "../context";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <SSRProvider>
        <Heading />
        <Container>
          <ToastProvider>
            <NextNProgress />
            <TopHead />
            <Component {...pageProps} />
            <Footer />
          </ToastProvider>
        </Container>
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
