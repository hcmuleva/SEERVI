import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//Create User Role
 const createUserRole = gql`
    mutation($data: CreateRoleMemberInput!) {
        createUserRole(
            data: $data
        ){
            id
            status
            description
            
        }
    }`
export {createUserRole}