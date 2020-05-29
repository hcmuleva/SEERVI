import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./common/apolloclient";
import Authentication from "./Authentication";
ReactDOM.render(
  <HashRouter>
    <ScrollToTop>
      <ApolloProvider client={client}>
        <Authentication />
      </ApolloProvider>
    </ScrollToTop>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
