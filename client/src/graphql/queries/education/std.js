import gql from 'graphql-tag';

const GET_ALLSTD = gql `
  query GET_ALLSTD{
  getAllStd{
    id
    branch
    stdname
    year
    category
  }
}
`;
export {GET_ALLSTD}