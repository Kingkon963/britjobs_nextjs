import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/graphql";

const httpLink = new HttpLink({
  uri: BACKEND_URL,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
  const session = await getSession();
  const modifiedHeaders = {
    headers: {
      ...headers,
      authorization: session?.jwt ? `Bearer ${session.jwt}` : "",
    },
  };
  return modifiedHeaders;
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
