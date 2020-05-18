import gql from "graphql-tag";
const GET_TOPIC_BY_ID = gql`
  query GET_TOPIC_BY_ID($id: ID!) {
    getTopicById(id: $id) {
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
    }
  }
`;
export { GET_TOPIC_BY_ID };
