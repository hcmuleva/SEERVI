import gql from 'graphql-tag';

const GET_ALLMEDIUM = gql `
  query GET_ALLMEDIUM{
  getAllMedium{
    id
    name
  }
}
`;
export {GET_ALLMEDIUM}