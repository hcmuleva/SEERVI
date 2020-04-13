
import gql from "graphql-tag";


const DELETE_UNIT = gql`
  mutation DELETE_UNIT($id: ID!) {
    deleteUnit(id: $id) {
      id
      name
    }
  }
`;
export {DELETE_UNIT}