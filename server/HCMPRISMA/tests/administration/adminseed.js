import 'cross-fetch/polyfill'
import prisma from '../../../src/prisma'
import getClient from '../getClient'
import { gql } from 'apollo-boost'
import adminStructure from './adminSeedDataStructure'
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
const orgOne = {
    input: {
        name: 'SEERVI',
        description: 'THIS IS FOR OUR SOCIETY'
    },
    organization: undefined
}

const seedOrgDatabase = async () => {
     //Delete org flow data
     await prisma.mutation.deleteManyOrganizations()
     await prisma.mutation.deleteManySubOrgs()
    orgOne.organization=await prisma.mutation.createOrganization({
        data:orgOne.input
    })
     
}



export { seedOrgDatabase as default,orgOne}