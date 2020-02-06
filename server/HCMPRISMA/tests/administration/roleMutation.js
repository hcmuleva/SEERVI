import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//Groupp Create
 const createOrgRole = gql`
    mutation($data: CreateRoleInput!) {
        createOrgRole(
            data: $data
        ){
            id
            name
            description
            
        }
    }`

    const createSubOrgRole = gql`
    mutation($data: CreateRoleInput!) {
        createSubOrgRole(
            data: $data
        ){
            id
            name
            description
            
        }
    }`

    const createGroupRole = gql`
    mutation($data: CreateRoleInput!) {
        createGroupRole(
            data: $data
        ){
            id
            name
            description
            
        }
    }`
    const createSubGroupRolegql = gql`
     mutation($data: CreateRoleInput!) {
        createSubGroupRole(
            data: $data
        ){
            id
            name
            description
        
        }
    }`

     const createSubGroupRoleInputData=(name,description,subgroup) =>{
        return {data:{name:name,description:description,subgroup:subgroup}}
    }
export {createOrgRole,createSubOrgRole,createGroupRole,createSubGroupRolegql,createSubGroupRoleInputData}
 
