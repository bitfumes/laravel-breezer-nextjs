import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import AppStoreProvider from "store/app";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { ToastContainer } from "react-toast";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStoreProvider>
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />;
    </AppStoreProvider>
  );
}
export default MyApp;
