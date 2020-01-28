import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//SubOrg CreateOeration
 const createSubOrg = gql`
    mutation($data: CreateSubOrganizationInput) {
        createSuborg(
            data: $data
        ){
            id
            name
            description
        }
    }`
    const createSubOrgData=(name,description,orgid) =>{
        return {data:{name:name,description:description,orgid:orgid}}
    }
    export {createSubOrgData,createSubOrg}