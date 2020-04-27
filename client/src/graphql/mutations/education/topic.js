import gql from "graphql-tag";
const CREATE_TOPIC = gql`
    mutation CREATE_TOPIC(
    $name: String!
    $subject: String!
    $unit: String
    $isPublished: Boolean
    $state:String
    $status:String
    $available:String 
    $description:String
    $picture:String
  ) {
    createTopic(
      data: {
        
        name: $name
        subject: $subject
        unit:$unit
        isPublished: $isPublished
        state:$state
        status:$status
        available:$available 
        picture:$picture
        description:$description
      }
    ) {
        id
      name
      isPublished
    }
  }
`;
export { CREATE_TOPIC };
