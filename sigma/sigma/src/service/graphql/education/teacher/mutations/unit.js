import gql from "graphql-tag";
const CREATE_UNIT = gql`
  mutation CREATE_UNIT(
    $name: String!
    $subject: String!
    $isPublished: Boolean
    $state: String
    $status: String
    $available: String
    $description: String
    $picture: String
  ) {
    createUnit(
      data: {
        name: $name
        subject: $subject
        isPublished: $isPublished
        state: $state
        status: $status
        available: $available
        description: $description
        picture: $picture
      }
    ) {
      id
      name
      isPublished
    }
  }
`;
export { CREATE_UNIT };
