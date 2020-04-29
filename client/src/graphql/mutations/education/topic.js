import gql from "graphql-tag";
const CREATE_TOPIC = gql`
  mutation CREATE_TOPIC(
    $name: String!
    $unit: String
    $isPublished: Boolean
    $state: String
    $status: String
    $available: String
    $description: String
    $picture: String
  ) {
    createTopic(
      data: {
        name: $name
        unit: $unit
        isPublished: $isPublished
        state: $state
        status: $status
        available: $available
        picture: $picture
        description: $description
      }
    ) {
      id
      name
    }
  }
`;
export { CREATE_TOPIC };
