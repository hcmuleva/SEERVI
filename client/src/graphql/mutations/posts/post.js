import gql from "graphql-tag";



 const CREATE_POST = gql`
  mutation CREATE_POST($title: String!, $body: String!,$published:Boolean! ) {
    createPost(data: { title: $title, body: $body ,published:$published })  {
    id
      title
      body
  }
  }
`;


export {CREATE_POST}