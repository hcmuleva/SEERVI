import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import Auth from './modules/Auth'

export const client = new ApolloClient({
  // Provide required constructor fields
 
  link: createUploadLink(
    { uri: 'http://localhost:4000',
    headers: {
      authorization: Auth.getToken()
    }
    }
    ),
    cache: new InMemoryCache()

});

