import 'cross-fetch/polyfill'
import prisma from '../../../src/prisma'
import getClient from '../getClient'
import { gql } from 'apollo-boost'
const client =getClient()
const createOrg = gql`
    mutation($data: CreateOrganizationInput!) {
        createOrganization(
            data: $data
        ){
            id
            name
            description
        }
    }
`

const createSubOrg = gql`
    mutation($data: CreateSubOrganizationInput!) {
        createSubOrg(
            data: $data
        ){
            id
            name
        }
    }
`
const  createSingleOrg= async (orgData)=>{
    const variables={
        data:{
            name:orgData.name,
            description:orgData.description
        } 
    } 
    const response=  await client.mutate({
        mutation: createOrg,
        variables
    })

    return response
    
}

const createSingleSuborg=async (suborgdata)=>{
    console.log("DATA RECIEVED", JSON.stringify(suborgdata))
    const variables={
        data:{
            name:suborgdata.name,
            org:suborgdata.org
        }
    }
    const response=  await client.mutate({
        mutation: createSubOrg,
        variables
    })
}
export {createSingleOrg,createSingleSuborg}