import gql from "graphql-tag";
const CREATE_EXAMPLE = gql`
  mutation CREATE_EXAMPLE(
    $name: String!
    $level: Int
    $fileInfo: Json
    $type: String!
    $url: String
    $subject: String
    $unit: String
    $topic: String
    $isPublished: Boolean
    $state: String
    $status: String
    $available: String
  ) {
    createExample(
      data: {
        name: $name
        level: $level
        fileInfo: $fileInfo
        type: $type
        url: $url
        subject: $subject
        unit: $unit
        topic: $topic
        isPublished: $isPublished
        state: $state
        status: $status
        available: $available
      }
    ) {
      id
      name
      url
      type
      isPublished
    }
  }
`;
export { CREATE_EXAMPLE };
