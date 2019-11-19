import React from 'react'
import Routing from './Routing'
import { ApolloProvider } from "@apollo/react-hooks";
import {client } from './apollo'
export default function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <Routing/>
    </div>
    </ApolloProvider>
  )
}
