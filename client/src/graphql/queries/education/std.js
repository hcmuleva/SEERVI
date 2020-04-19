import gql from "graphql-tag";

const GET_ALLSTD = gql`
  query GET_ALLSTD {
    getAllStd {
      id
      gradename
      category
      branch
      year
      semester
      specilize
      isPublished
    }
  }
`;
export { GET_ALLSTD };
