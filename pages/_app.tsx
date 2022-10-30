import "../styles/globals.css";

import type { AppProps } from "next/app";
import ProccessLoader from "../core/components/molecules/ProcessLoader";
import useLoadingProcess from "../core/hooks/useLoadingProcess";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoading } = useLoadingProcess();

  useEffect(() => {
    document.title = "Euro Football Records";
  }, []);

  return (
    <>
      <ProccessLoader isLoading={isLoading} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
