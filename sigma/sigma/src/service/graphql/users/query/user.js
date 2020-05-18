import gql from "graphql-tag";
const LOGGED_IN = gql`
  query LOGGED_IN {
    loggedInUser {
      roles {
        id
        name
        org {
          id
          name
        }
        suborg {
          id
          name
        }
        group {
          id
          name
        }
        subgroup {
          id
          name
        }
      }
    }
  }
`;
const MY_ASSIGNED_SUBJECTS = gql`
  query MY_ASSIGNED_SUBJECTS {
    mySubscription {
      id
      mySubjects {
        id
        name
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
const LOGIN_USER = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
        firstname
        email
      }
      token
    }
  }
`;
export { LOGGED_IN, LOGIN_USER, MY_ASSIGNED_SUBJECTS };
