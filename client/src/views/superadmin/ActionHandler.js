import {DELETE_ORG} from '../mutations/org'
import {GET_ORGS} from '../queries/getAllOrgs'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
const myCalledfunction=()=>{
     const [deleteOrganization] = useMutation(DELETE_ORG);
}
const deleteAction=(id)=>{
   
    console.log("DeleteAction has been called")
     deleteOrganization({ variables: { id },refetchQueries: [{ query: GET_ORGS }]   })
     .then((res)=>{console.log("Response",res)
            
         })
      .catch(function onReject(e) {
             console.log("Error ",e)
         });

}
export {deleteAction as default}