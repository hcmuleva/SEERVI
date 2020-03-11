import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';

import Auth from './modules/Auth'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});
// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});
authLink.concat(wsLink)
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

