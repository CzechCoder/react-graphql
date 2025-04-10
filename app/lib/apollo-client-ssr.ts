import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { cache } from "react";

export const getApolloClient = cache(() => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: process.env.GRAPHQL_API_URL,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });
});
