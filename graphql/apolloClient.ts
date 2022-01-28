import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/graphql";

const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
});

export { client };
