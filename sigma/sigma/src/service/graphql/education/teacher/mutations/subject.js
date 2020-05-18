import gql from "graphql-tag";

const CREATE_SUBJECT = gql`
  mutation CREATE_SUBJECT(
    $name: String!
    $picture: String
    $medium: String
    $std: String!
    $category: String
    $board: String
    $group: String
    $subgroup: String
    $isPublished: Boolean
    $state: String
    $status: String
    $available: String
    $description: String
  ) {
    createSubject(
      data: {
        name: $name
        picture: $picture
        medium: $medium
        std: $std
        category: $category
        board: $board
        group: $group
        subgroup: $subgroup
        isPublished: $isPublished
        state: $state
        status: $status
        available: $available
        description: $description
      }
    ) {
      id
      name
      picture
      category
      board
      isPublished
      state
      status
      available
      description
      medium {
        id
        name
      }
      std {
        id
        gradename
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
`;
const UPDATE_SUBJECT = gql`
  mutation UPDATE_SUBJECT(
    $id: ID!
    $name: String
    $picture: String
    $board: String
    $category: String
    $group: String
    $subgroup: String
    $medium: String
    $std: String
  ) {
    updateSubject(
      id: $id
      data: {
        name: $name
        board: $board
        category: $category
        group: $group
        subgroup: $subgroup
        medium: $medium
        picture: $picture
        std: $std
      }
    ) {
      id
      name
      board
      category
      picture
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

const DELETE_SUBJECT = gql`
  mutation DELETE_SUBJECT($id: ID!) {
    deleteSubject(id: $id) {
      id
      name
      board
      category
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

export { CREATE_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT };
