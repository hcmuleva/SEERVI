import gql from 'graphql-tag';

const GET_SUBJECTDATA=gql`
  query GET_SUBJECTDATA($id:ID!){
      roleById(id:$id){
    name
    id
    users{
      id
      email
    }
  
    }
  
}`;

export {GET_SUBJECTDATA}
