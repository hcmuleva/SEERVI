
import React, { Component } from 'react'
import Routing from './Routing'
import { ApolloProvider } from "@apollo/react-hooks";
import {client } from './apollo'
import LoginMd from "./components/authentication/LoginMd";
import Auth from "./modules/Auth"
export default class App extends Component {
  
  state={
    authvalue:false
  }
  handleState(){
    this.setState()
  }
  render() {
    
    return (<ApolloProvider client={client}>
     <Routing/>
      </ApolloProvider>
    )
    
    
  }
}
