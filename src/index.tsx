import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { render } from "react-dom";
import { client } from "./apollo";
import App from "./App";
import ReactDOM from "react-dom";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
