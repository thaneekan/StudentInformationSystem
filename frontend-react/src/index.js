import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use `react-dom/client`
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; // Import Apollo Client setup
import App from "./App";

// ✅ Use createRoot() for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
