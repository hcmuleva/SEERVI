import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
//User CreateOeration
const createUser = gql`
    mutation($data: CreateUserInput!) {createUser( data: $data){ user { id firstname lastname email } }
    }`
    const createUserInputData=(firstname,lastname,email,password,org,suborg) =>{
        return {data:{firstname:firstname,lastname:lastname,email:email,password:password,org:org,suborg:suborg}}
    }

const updateUser = gql`
    mutation($id:ID!,$data: UpdateUserInput!) {
    updateUser(
        id:$id 
        data: $data
     ){id firstname lastname email }
}`

const deleteUser = gql`
    mutation($id:ID!) {
        deleteUser(id:$id){id firstname lastname email}
    }`
export {createUser, createUserInputData,deleteUser,updateUser}