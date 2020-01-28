import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//SubOrg CreateOeration
 const createSuborg = gql`
    mutation($data: CreateSubOrganizationInput!) {
        createSubOrg(
            data: $data
        ){
            id
            name
            description
        }
    }`
    const createSubOrgInputData=(name,description,orgid) =>{
        return {data:{name:name,description:description,orgid:orgid}}
    }

    const deleteSubOrg = gql`
    mutation($id: ID!) {
        deleteSubOrg(
           id: $id
        ){
            id
            name
            description
        }
    }`
      const deleteSubOrgInputData=(id)=>{
        return {id}
    }

    const udateSubOrg = gql`
    mutation($id: ID!,$data:UpdateSubOrgInpput!) {
        updateSuborg(
           id: $id,data: $data
        ){
            id
            name
            description
        }
    }`
      const updateSubOrgInputData=(id,name,description)=>{
         if(name && description) {
            return {id:id,data:{name,description}   }
        }else if(name){
            return {id:id,data:{name}   }
        }else if(description){
            return {id:id,data:{description}   }
        }
    }

    export {createSuborg,createSubOrgInputData,deleteSubOrg,deleteSubOrgInputData,udateSubOrg,updateSubOrgInputData}