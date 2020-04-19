import gql from "graphql-tag";

const CREATE_STD = gql`
  mutation CREATE_STD(
    $gradename: String!
    $category: String!
    $branch: String
    $year: String
    $semester: String
    $specilize: String
    $isPublished: Boolean
  ) {
    createStd(
      data: {
        gradename: $gradename
        category: $category
        branch: $branch
        year: $year
        semester: $semester
        specilize: $specilize
        isPublished: $isPublished
      }
    ) {
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
export { CREATE_STD };
