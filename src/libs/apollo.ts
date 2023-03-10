import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apollo = new ApolloClient({
  uri: "https://api-sa-east-1.hygraph.com/v2/clf2hm31s3ktw01t5eu532ckn/master",
  cache: new InMemoryCache(),
});
