import gql from "graphql-tag";
const CREATE_SUBORG = gql`
  mutation CREATESUBORG($name: String!, $org: String!, $description: String) {
    createSubOrg(
      data: { name: $name, orgid: $org, description: $description }
    ) {
      name
      id
    }
  }
`;

const UPDATE_SUBORG = gql`
  mutation UPDATE_SUBORG($id: ID!, $name: String, $description: String) {
    updateSuborg(id: $id, data: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;

const DELETE_SUBORG = gql`
  mutation DELETESUBORG($id: ID!) {
    deleteSubOrg(id: $id) {
      id
      name
    }
  }
`;
export { CREATE_SUBORG, UPDATE_SUBORG, DELETE_SUBORG };
