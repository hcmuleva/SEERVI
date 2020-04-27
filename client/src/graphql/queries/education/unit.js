import gql from "graphql-tag";
const GET_UNIT_BY_ID = gql`
  query GET_UNIT_BY_ID($id: ID!) {
    getUnitById(id: $id) {
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
        number
      }
      topics {
        id
        name
      }
    }
  }
`;
export { GET_UNIT_BY_ID };
