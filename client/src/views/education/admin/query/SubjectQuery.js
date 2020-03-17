import gql from 'graphql-tag';

const GET_ALLSUBJECTS = gql `
  query GET_ALLSUBJECTS{
    getAllSubjects{
    id name board category 
       group{ id name}
       subgroup{id name }
       medium{id name }
       std{ id stdname}
  }
}
`;
export {GET_ALLSUBJECTS}