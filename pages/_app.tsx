import '../styles/globals.css'
import type { AppProps } from 'next/app'
import useLoadingProcess from '../core/hooks/useLoadingProcess'
import ProcessLoader from '../core/components/molecules/ProcessLoader';

export default function App({ Component, pageProps }: AppProps) {
  const {isLoading} = useLoadingProcess();
  return <>
    <ProcessLoader isLoading={isLoading} />
    <Component {...pageProps} />
  </>
}
