import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
// Instantiate required constructor fields
const cache = new InMemoryCache();


export const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: createUploadLink({ uri: 'http://localhost:4000'})
});

