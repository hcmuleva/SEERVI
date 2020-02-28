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
export { CREATE_USER,CREATE_USER_ADMIN};
