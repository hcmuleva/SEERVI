import gql from "graphql-tag";


const CREATE_ORG = gql`
  mutation CREATEORG($name: String!, $description: String!,$logo: String!) {
    createOrganization(data: { name: $name, description: $description, logo:$logo }) {
      name
      id
      description,logo
    }
  }
`;

const UPDATE_ORG = gql`
  mutation UPDATE_ORG($id: ID!, $name: String, $description: String,$logo: String) {
    updateOrg(id: $id, data:{name:$name,description:$description,logo: $logo}) {
      id
      name,logo
      description
    }
  }
`;

const DELETE_ORG = gql`
  mutation DELETEORG($id: ID!) {
    deleteOrg(id: $id) {
      id
      name
    }
  }
`;
export {CREATE_ORG,UPDATE_ORG,DELETE_ORG}