import gql from "graphql-tag";

const GET_ALLORGS_ALLROLES = gql`
  query GET_ALLORGS_ALLROLES {
    allorgs {
      id
      name
      orgRoles {
        id
        name
      }
    }
  }
`;

const GET_ALLROLES = gql`
  query GET_ALLROLES {
    allRoles {
      id
      name
    }
  }
`;
const GET_ORG_ROLES = gql`
  query GET_ORG_ROLES($id: String!) {
    orgRoles(id: $id) {
      id
      name
    }
  }
`;
const GET_MYROLES = gql`
  query GET_MYROLES {
    myRoles {
      id
      description
      userid {
        id
        email
      }
      role {
        id
        name
        org {
          id
          name
          suborgs {
            id
            name
          }
        }
      }
    }
  }
`;

const GET_ROLES = gql`
  query GETROLES {
    roles {
      id
      rolename
    }
  }
`;
const GET_ORGROLES = gql`
  query GET_ORGROLES($id: String!) {
    orgRoles(id: $id) {
      id
      name
      description
    }
  }
`;

const GET_SUBORGROLES = gql`
  query GET_SUBORGROLES($id: String!) {
    suborgRoles(id: $id) {
      id
      name
      description
      suborg {
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

const GET_GROUPROLES = gql`
  query GET_GROUPROLES($id: String!) {
    groupRoles(id: $id) {
      id
      name
      description
      group {
        id
        name
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
  }
`;

const GET_SUBGROUPROLES = gql`
  query GET_SUBGROUPROLES($id: String!) {
    subGroupRoles(id: $id) {
      id
      name
      description
    }
  }
`;
export {
  GET_ORG_ROLES,
  GET_ORGROLES,
  GET_ALLORGS_ALLROLES,
  GET_ALLROLES,
  GET_MYROLES,
  GET_ROLES,
  GET_SUBORGROLES,
  GET_GROUPROLES,
  GET_SUBGROUPROLES,
};
