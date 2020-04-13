
import gql from "graphql-tag";

const CREATE_SUBJECT = gql`
  mutation CREATE_SUBJECT($name: String!, $board: String,$category: String,$group: String,$subgroup: String,$medium: String,$std:String!) {
    createSubject(data: { name:$name,board:$board,category:$category, group:$group ,subgroup:$subgroup,medium:$medium,std:$std}) {
      id name board category 
       group{ id name}
       subgroup{id name }
       medium{id name }
       std{ id stdname}
    }
  }
`;
const UPDATE_SUBJECT = gql`
  mutation UPDATE_SUBJECT($id: ID!,$name: String!, $board: String,$category: String,$group: String,$subgroup: String,$medium: String,$std:String!) {
    updateSubject(id: $id,data: { name:$name,board:$board,category:$category, group:$group ,subgroup:$subgroup,medium:$medium,std:$std}) {
      id name board category 
       group{ id name}
       subgroup{id name }
       medium{id name }
       std{ id stdname}
    }
  }
`;



const DELETE_SUBJECT = gql`
  mutation DELETE_SUBJECT($id: ID!) {
    deleteSubject(id: $id) {
       id name board category 
       group{ id name}
       subgroup{id name }
       medium{id name }
       std{ id stdname}
    }
  }
`;

export {CREATE_SUBJECT,UPDATE_SUBJECT,DELETE_SUBJECT}