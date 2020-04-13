import gql from "graphql-tag";
const CREATE_GROUP = gql`
  mutation CREATESGROUP($name: String!, $suborgid: String!,$description:String) {
    createGroup(data: { name: $name, suborgid: $suborgid ,description:$description}) {
      name
      id
      
    }
  }
`;

const UPDATE_GROUP = gql`
  mutation UPDATE_GROUP($id: ID!, $name: String, $description: String) {
    updateGroup(id: $id, data:{name:$name,description:$description}) {
      id
      name
      description
    }
  }
`;

const DELETE_GROUP = gql`
  mutation DELETE_GROUP($id: ID!) {
    deleteGroup(id: $id) {
      id
      name
    }
  }
`;
export {CREATE_GROUP,UPDATE_GROUP,DELETE_GROUP}