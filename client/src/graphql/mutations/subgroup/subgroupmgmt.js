import gql from "graphql-tag";
const CREATE_SUBGROUP = gql`
  mutation CREATE_SUBGROUP($name: String!, $groupid: String!,$description:String) {
    createSubGroup(data: { name: $name, groupid: $groupid ,description:$description}) {
      name
      id
      
    }
  }
`;

const UPDATE_SUBGROUP = gql`
  mutation UPDATE_SUBGROUP($id: ID!, $name: String, $description: String) {
    updateSubGroup(id: $id, data:{name:$name,description:$description}) {
      id
      name
      description
    }
  }
`;

const DELETE_SUBGROUP = gql`
  mutation DELETE_SUBGROUP($id: ID!) {
    deleteSubGroup(id: $id) {
      id
      name
    }
  }
`;
export {CREATE_SUBGROUP,UPDATE_SUBGROUP,DELETE_SUBGROUP}