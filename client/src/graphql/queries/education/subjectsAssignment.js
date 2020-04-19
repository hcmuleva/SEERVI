import gql from 'graphql-tag';

const GET_SUBJECTDATA = gql `
  query GET_SUBJECTDATA($id:String!){
    subgroupById(id:$id){
     id
     name
  subgroupRoles{
      id
      name
    }     

     subjects{
         id
         name
        std{
        id
        gradename
      }
   
     }
    
  }
  
}`;

export {GET_SUBJECTDATA}
