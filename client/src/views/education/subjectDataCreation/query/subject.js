
import gql from 'graphql-tag';

 const GET_MYSUBSCRIPTION = gql`    
    query{
  mySubscription{
    id
    subscribedAs{id name }
    mySubjects{ id name 
        units{ id name isPublished
            topics{id name }
        }
    }
  }
}`;
export {GET_MYSUBSCRIPTION}