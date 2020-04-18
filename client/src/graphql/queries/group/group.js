import gql from "graphql-tag";

const GET_GROUPSOFSUBORG = gql`
  query GET_GROUPSOFSUBORG($id: String!) {
    groupsOfSubOrg(id: $id) {
      id
      name
      description
    }
  }
`;
const GET_GROUP_BY_ID = gql`
  query GET_GROUP_BY_ID($id: ID!) {
    groupById(id: $id) {
      id
      name
      description
      subgroups {
        id
        name
        description
      }
      suborgid {
        id
        name
        org {
          id
          name
        }
      }
    }
  }
`;
const GET_GROUPS = gql`
  query getgroup {
    allGroups {
      id
      name
      subgroups {
        id
        name
      }
    }
  }
`;
export { GET_GROUPSOFSUBORG, GET_GROUP_BY_ID, GET_GROUPS };
