import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL, // Your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;

