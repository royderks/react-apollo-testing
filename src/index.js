import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Products from "./products";

const client = new ApolloClient({
  uri: "https://qvo03x069.sse.codesandbox.io/graphql"
});

render(
  <ApolloProvider client={client}>
    <Products />
  </ApolloProvider>,
  document.getElementById("root")
);