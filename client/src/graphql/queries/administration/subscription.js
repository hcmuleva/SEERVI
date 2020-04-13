import gql from 'graphql-tag';
const GET_SUBSCRIPTION = gql`
   query GET_SUBSCRIPTION{
        mySubscription{id subsType
            mySubjects{ id name
                medium{id name }
            }
        }
    }
   `;

const GET_SUBSCRIPTION = gql`
   query GET_SUBSCRIPTION{
  mySubscription{
    id
    subsType
    mySubjects{
      id
      name
      medium{
        id
        name
      }
    }
  }
   export {GET_SUBSCRIPTION}