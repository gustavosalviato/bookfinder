import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apollo = new ApolloClient({
  uri: process.env.APOLLO_CONTENT_API,
  cache: new InMemoryCache(),
})
