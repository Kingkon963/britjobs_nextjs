import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Cookies } from "react-cookie";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/graphql";

const cookies = new Cookies();

const httpLink = new HttpLink({
  uri: BACKEND_URL,
  headers: {
    Authorization: `Bearer ${process.browser ? cookies.get("jwt") || "" : ""}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export { client };
