import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//Groupp Create
 const creategroup = gql`
    mutation($data: CreateGroupInput!) {
        createGroup(
            data: $data
        ){
            id
            name
            description
        }
    }`
    const createGroupInputData=(name,description,suborgid) =>{
        return {data:{name:name,description:description,suborgid:suborgid}}
    }


const updategroup = gql`
    mutation($id:ID!,$data: UpdateGroupInput!) {
        updateGroup(
            id:$id
            data: $data
        ){
            id
            name
            description
        }
    }`
     
const deletegroup = gql`
    mutation($id:ID!) {
        deleteGroup(
            id:$id
            
        ){
            id
            name
            description
        }
    }`
  

    const deleteGroupInputData=(id)=>{
        return {id}
    }
    const updateGroupInputData=(id, name,description) =>{
        if(!id) return new Error("ID is require to update Group")
        if(name&&description) return {id,data:{name,description}}
        if(name) return {id,data:{name}}
        if(description)return {id,data:{description}}
    }
    export {creategroup,createGroupInputData,updategroup,updateGroupInputData,deletegroup,deleteGroupInputData}