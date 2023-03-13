import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { apollo } from '../libs/apollo'

import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
