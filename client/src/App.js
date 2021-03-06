import React, { Component } from "react";
import Routing from "./Routing";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./apollo";
import "./assets/primereactstyles/layout/layout.scss";
export default class App extends Component {
  state = {
    authvalue: false,
  };
  handleState() {
    this.setState();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Routing />
      </ApolloProvider>
    );
  }
}
