import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//Orgnization Create Operation
 const createOrg = gql`
    mutation($data: CreateOrganizationInput!) {
        createOrganization(
            data: $data
        ){
            id
            name
            description
        }
    }`
    
const deleteOrg = gql`
    mutation($id: ID!) {
        deleteOrg(
            id: $id
        ){
            id
            name
            description
        }
    }`

    const deleteOrgInputData=(id)=>{
        return {id}
    }
    const orgInputData=(orgName, description)=>{
          return  {data:{name:orgName,description:description}   }
    }


    const updateOrg = gql`
    mutation($id: ID!,$data:UpdateOrganizationInpput!) {
        updateOrg(
            id: $id,data: $data
        ){
            id
            name
            description
        }
    }`

    const updateOrgInputData=(id,orgname,description)=>{
        if(orgname && description) {
            return {id:id,data:{name:orgname,description:description}   }
        }else if(orgname){
            return {id:id,data:{name:orgname}   }
        }else if(description){
            return {id:id,data:{description:description}   }
        }
        
    }
    
    
export {createOrg,orgInputData,deleteOrg,deleteOrgInputData,updateOrg,updateOrgInputData}