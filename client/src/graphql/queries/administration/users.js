import gql from 'graphql-tag';
 const GET_AllUsers = gql`
    query GET_AllUsers{
        users{id, firstname, lastname,email,org{id name suborgs{ 
            id name
			}
        }
    }}`;

    
export {GET_AllUsers}