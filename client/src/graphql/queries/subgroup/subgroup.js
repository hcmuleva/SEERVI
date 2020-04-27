import gql from "graphql-tag";

const GET_SUBGROUPSOFGROUP = gql`
  query GET_SUBGROUPSOFGROUP($id: String!) {
    subgroupsOfGroup(id: $id) {
      id
      name
      description
    }
  }
`;

const GET_SUBGROUPS = gql`
  query GET_SUBGROUPS {
    allSubGroups {
      id
      name
    }
  }
`;

const GET_SUBGROUPBYID = gql`
  query GET_SUBORGBYID($id: String!) {
    subgroupById(id: $id) {
      id
      name
      subgroupRoles {
        id
        name
      }
      groupid {
        suborgid {
          org {
            id
            name
            author {
              id
              email
              firstname
              lastname
              email
              roles {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

const GET_SUBJECTS_OF_SUBGROUP =gql`
  query GET_SUBJECTS_OF_SUBGROUP($id:String!){
        subgroupById(id: $id) {
              id
              name
               
              subgroupRoles{
                id
                name
              }
              subjects{
                id
                name
                std{
                  id
                  gradename
                }
              }
        }
  }
`;
export { GET_SUBGROUPSOFGROUP, GET_SUBGROUPS, GET_SUBGROUPBYID ,GET_SUBJECTS_OF_SUBGROUP};
