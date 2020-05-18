import gql from "graphql-tag";
const MY_ASSIGNED_SUBJECTS = gql`
  query MY_ASSIGNED_SUBJECTS {
    mySubscription {
      id
      userid {
        id
        firstname
        lastname
        email
      }
      mySubjects {
        id
        name
        picture
        std {
          id
          gradename
        }
        contents {
          id
          name
        }
        units {
          id
          name
          contents {
            id
            name
          }
          topics {
            id
            name
            contents {
              id
              name
            }
          }
        }
      }
      subscribedAs {
        id
        name
      }
    }
  }
`;
export { MY_ASSIGNED_SUBJECTS };
