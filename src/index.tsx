import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { render } from "react-dom";
import { client } from "./apollo";
import App from "./components/App";
import ReactDOM from "react-dom";
import React from "react";
import './styles/styles.css'
import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
