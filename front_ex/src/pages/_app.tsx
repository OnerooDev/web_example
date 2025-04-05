import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { createUrqlClient } from '../utils/UrqlClient';
import { withUrqlClient } from 'next-urql';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}

export default withUrqlClient(createUrqlClient)(App);