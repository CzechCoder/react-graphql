import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // in case you want to use a .env variable, don't forget to put NEXT_PUBLIC in front of it
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
