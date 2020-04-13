import gql from "graphql-tag";
const GET_ORGBYID = gql`
  query GET_ORGBYID($id: ID!) {
    orgById(id: $id) {
      id
      name
      orgRoles {
        id
        name
      }
      author {
        id
        email
        firstname
        roles {
          id
          name
        }
      }
    }
  }
`;

const GET_ORGS = gql`
  query allorgs {
    allorgs {
      id
      name
      description
      logo
      createdAt
      updatedAt
      orgRoles {
        id
        name
      }
      suborgs {
        id
        name
        description
        suborgRoles {
          id
          name
        }
        userGroups {
          id
          name
          groupRoles {
            id
            name
          }
          subgroups {
            id
            name
            subgroupRoles {
              id
              name
            }
          }
        }
      }
    }
  }
`;
export { GET_ORGBYID, GET_ORGS };
