import gql from "graphql-tag";
const GET_SUBORGBYID = gql`
  query GET_SUBORGBYID($id: String!) {
    suborgById(id: $id) {
      id
      name
      description
      org {
        id
        name
      }
      userGroups {
        id
        name
      }
    }
  }
`;

const GET_SUBORGS = gql`
  query suborgsoforg($id: String!) {
    suborgsoforg(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      suborgRoles {
        id
        name
      }
      org {
        id
        name
      }
    }
  }
`;
export { GET_SUBORGBYID, GET_SUBORGS };
