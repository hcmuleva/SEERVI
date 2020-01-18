import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

beforeEach( async ()=>{
    //await prisma.mutation.deleteManyOrganizations()
    await prisma.mutation.deleteManySubOrgs()
    const org=await prisma.mutation.createOrganization({data:{name:"SEED1",description: "Auto Generated org"}})
    const orgid=org.id
    const subOrg=await prisma.mutation.createSubOrg({data:{name:"FirstSubOrg",org:{connect:{id:orgid}}}})
})
test('createOrg',async ()=>{
    const createOrg=gql`
        mutation{
            createOrganization(data:{name:"SEE",description:"Default Org created for all public user"}){
            name
            id
            description
        }
        }
    `
    const response =await client.mutate({
        mutation:createOrg
    })
    const orgid=response.data.createOrganization.id
    const exist =await prisma.exists.Organization({id:orgid})
    expect(exist).toBe(true)

})