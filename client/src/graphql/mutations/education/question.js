import gql from "graphql-tag";

const CREATE_QUESTION = gql`
  mutation CREATE_QUESTION(
    $level: Int!
    $quetype: String!
    $descriptionfileInfo: Json
    $descriptionType: String!
    $descriptionurl: String
    $subject: String
    $unit: String
    $topic: String
    $isPublished: Boolean
    $state: String
    $status: String
    $available: String
    $options: Json!
  ) {
    createQuestion(
      data: {
        level: $level
        quetype: $quetype
        descriptionfileInfo: $descriptionfileInfo
        descriptionType: $descriptionType
        descriptionurl: $descriptionurl
        subject: $subject
        unit: $unit
        topic: $topic
        isPublished: $isPublished
        state: $state
        status: $status
        available: $available
        options: $options
      }
    ) {
      id

      descriptionurl
      descriptionType
      descriptionfileInfo
      quetype
      isPublished
      state
      options
      status
      available
      descriptionType
    }
  }
`;
export { CREATE_QUESTION };
