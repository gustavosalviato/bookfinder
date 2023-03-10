import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import "../styles/global.css";
import { apollo } from "../libs/apollo";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
