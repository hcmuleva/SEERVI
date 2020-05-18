import gql from "graphql-tag";

const GET_SUBJECT_BY_ID = gql`
  query GET_SUBJECT_BY_ID($id: ID!) {
    getSubjectById(id: $id) {
      id
      name
      units {
        id
        name
        picture
        description
        contents {
          id
          name
          fileInfo
          type
          url
          level
        }
        topics {
          id
          name
          contents {
            id
            name
            fileInfo
            type
            url
            level
          }
        }
      }
      contents {
        id
        name
        fileInfo
        type
        url
        level
      }
    }
  }
`;

const GET_ALLFORMULA_SUBJECT_BY_ID = gql`
  query GET_ALLFORMULA_SUBJECT_BY_ID($id: ID!) {
    getSubjectById(id: $id) {
      id
      name
      units {
        id
        name
        picture
        description
        formulas {
          id
          name
          fileInfo
          type
          url
          level
        }
        topics {
          id
          name
          formulas {
            id
            name
            fileInfo
            type
            url
            level
          }
        }
      }
      formulas {
        id
        name
        fileInfo
        type
        url
        level
      }
    }
  }
`;

export { GET_SUBJECT_BY_ID, GET_ALLFORMULA_SUBJECT_BY_ID };
