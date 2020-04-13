import gql from "graphql-tag";


const CREATE_STD = gql`
  mutation CREATE_STD($stdname: String!, $branch: String!,$year: String!,$category: String!) {
    createStd(data: { stdname:$stdname,branch:$branch,year:$year, category:$category }) {
      stdname
      branch
      year
      category
    }
  }
`;
export {CREATE_STD}