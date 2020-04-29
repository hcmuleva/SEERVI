import gql from "graphql-tag";

const GET_ALLSUBJECTS = gql`
  query GET_ALLSUBJECTS {
    getAllSubjects {
      id
      name
      board
      category
      picture
      description
      color
      level
      status
      state
      group {
        id
        name
      }
      subgroup {
        id
        name
      }
      medium {
        id
        name
      }
      std {
        id
        gradename
      }
    }
  }
`;

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
      }
      contents {
        id
        name
        fileInfo
        type
        url
        number
      }
    }
  }
`;

export { GET_ALLSUBJECTS, GET_SUBJECT_BY_ID };
