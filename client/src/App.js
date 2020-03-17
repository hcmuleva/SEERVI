
import React, { Component } from 'react'
import Routing from './Routing'
import { ApolloProvider } from "@apollo/react-hooks";
import {client}  from './apollo'

export default class App extends Component {
  
  state={
    authvalue:false
  }
  handleState(){
    this.setState()
  }
  
  render() {
    console.log("\n*******\nHarish in client ")
    console.log("", process.env.PRISMA_SECRET)
    console.log("S3_ACCESS_KEY", process.env.REACT_APP_NOT_SECRET_S3_ACCESS_KEY)
    console.log("REACT_APP_NOT_SECRET_S3_BUCKET_NAME", process.env.REACT_APP_NOT_SECRET_S3_BUCKET_NAME)
    console.log("\n*******\nHarish in client ")
    return (
      <ApolloProvider client={client}>
        <Routing/>
      </ApolloProvider>
    )
    
    
  }
}
