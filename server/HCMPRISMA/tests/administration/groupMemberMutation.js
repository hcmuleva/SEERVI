import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//Member Create
 const createGroupMember = gql`
    mutation($data: CreateGroupMemberInput!) {
        assignUserToGroup(data:$data){ id status }
    }`
const updategroup = gql`
    mutation($id:ID!,$data: UpdateGroupMemberInput!) {
        updateUserToGroup(
            id:$id
            data: $data
        ){
            id
            status
        }
    }`
     
const deletegroup = gql`
    mutation($id:ID!) {
        deleteUserToGroup(
            id:$id
            
        ){
            id
        }
    }`
  
    export {createGroupMember,updategroup,deletegroup}