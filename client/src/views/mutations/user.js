import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CREATE_USER($firstname: String!, $lastname: String!,$password: String!, $email:String!) {
    createUser(data: { firstname: $firstname, lastname: $lastname,password:$password,email:$email }) {
      user{
          id
          firstname
          lastname
          email
      }
    }
  }
`;

const CREATE_USER_ADMIN = gql`
  mutation CREATE_USER_ADMIN($firstname: String!, $lastname: String!,$password: String!, $email:String!,$org:String!,$suborg:String!) {
    createUserByAdmin(data: { firstname: $firstname, lastname: $lastname,password:$password,email:$email,org:$org,suborg:$suborg }) {
      user{
          id
          firstname
          lastname
          email
      }
    }
  }
`;
const UPDATE_USER_ADMIN = gql`
  mutation UPDATE_USER_ADMIN($id: ID!,$firstname: String, $lastname: String,$password: String, $email:String) {
    updateUser(id: $id,data: { firstname: $firstname, lastname: $lastname,password:$password,email:$email }) {
    
          id
          firstname
          lastname
          email
      
    }
  }
`;

const ASSIGN_BULK_ROLE_TO_USER = gql `
   mutation ASSIGN_BULK_ROLE_TO_USER($userid: String!,$description:String $status: String!,$role: String!) {
    assignBulkRoleToUser(data: { userid: $userid, status: $status,role:$role,description:$description})
  }
  
` 
export { CREATE_USER,CREATE_USER_ADMIN,ASSIGN_BULK_ROLE_TO_USER,UPDATE_USER_ADMIN};
