import gql from "graphql-tag";
const CREATE_CONTENT = gql`
  mutation CREATE_CONTENT(
    $name: String!
    $number: Int
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
    createContent(
      data: {
        name: $name
        number: $number
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
export { CREATE_CONTENT };
