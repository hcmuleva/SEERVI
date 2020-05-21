import gql from "graphql-tag";

const GET_SUBJECT_SYLLABUS_BY_ID = gql`
  query GET_SUBJECT_SYLLABUS_BY_ID($id: ID!) {
    getSubjectById(id: $id) {
      id
      name
      picture
      units {
        id
        name
        picture
        description
        topics {
          id
          name
        }
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
const GET_ALLTIPSTRICKS_SUBJECT_BY_ID = gql`
  query GET_ALLTIPSTRICKS_SUBJECT_BY_ID($id: ID!) {
    getSubjectById(id: $id) {
      id
      name
      units {
        id
        name
        picture
        description
        tipstricks {
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
          tipstricks {
            id
            name
            fileInfo
            type
            url
            level
          }
        }
      }
      tipstricks {
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
const GET_ALLQUESTIONS_SUBJECT_BY_ID = gql`
  query GET_ALLQUESTIONS_SUBJECT_BY_ID($id: ID!) {
    getSubjectById(id: $id) {
      id
      name
      units {
        id
        name
        picture
        description
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
`;

export {
  GET_SUBJECT_SYLLABUS_BY_ID,
  GET_SUBJECT_BY_ID,
  GET_ALLFORMULA_SUBJECT_BY_ID,
  GET_ALLTIPSTRICKS_SUBJECT_BY_ID,
  GET_ALLQUESTIONS_SUBJECT_BY_ID,
};
