import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//Groupp Create
 const createsubgroup = gql`
    mutation($data: CreateSubGroupInput!) {
        createSubGroup(
            data: $data
        ){
            id
            name
            description
        }
    }`
    const createSubGroupInputData=(name,description,groupid) =>{
        return {data:{name:name,description:description,groupid:groupid}}
    }






const deletesubgroup = gql`
    mutation($id:ID!) {
        deleteSubGroup(
            id:$id
            
        ){
            id
            name
            description
        }
    }`
  

    const deleteSubGroupInputData=(id)=>{
        return {id}
    }
const updatesubgroup = gql`
    mutation($id:ID!,$data: UpdateSubGroupInput!) {
        updateSubGroup(
            id:$id
            data: $data
        ){
            id
            name
            description
        }
    }`
     
     
    const updateSubGroupInputData=(id, name,description) =>{
        if(!id) return new Error("ID is require to update SubGroup")
        if(name&&description) return {id,data:{name,description}}
        if(name) return {id,data:{name}}
        if(description)return {id,data:{description}}
    }
    export {createsubgroup,createSubGroupInputData,updatesubgroup,updateSubGroupInputData,deletesubgroup,deleteSubGroupInputData}