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
const MY_ASSIGNED_SUBJECTS_QUE = gql`
  query MY_ASSIGNED_SUBJECTS_QUE {
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
        questions {
          id
          quetype
          title
          descriptionurl
          descriptionType
          descriptionfileInfo
          categories
          options
          level
          explaination
        }

        std {
          id
          gradename
        }

        units {
          id
          name
          questions {
            id
            quetype
            title
            descriptionurl
            descriptionType
            descriptionfileInfo
            categories
            options
            level
            explaination
          }

          topics {
            id
            name
            questions {
              id
              quetype
              title
              descriptionurl
              descriptionType
              descriptionfileInfo
              categories
              options
              level
              explaination
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
export { MY_ASSIGNED_SUBJECTS, MY_ASSIGNED_SUBJECTS_QUE };
