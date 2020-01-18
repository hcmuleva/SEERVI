import 'cross-fetch/polyfill'
import prisma from '../../../src/prisma'
import seedOrgData ,{orgOne, subOrgOne} from './seedOrgData'
import getClient from '../getClient'
import { createOrg,createSubOrg} from './orgflowOperations'
import {createSingleOrg, createSingleSuborg} from './OrgFunction'
import jsonData from './jsonData.json'
const client = getClient()
beforeEach(seedOrgData)
const getOrgVariables=(name,description)=>{
    return  {
        data:{
            name:name,
            description:description
        }
       
    }
}
const getSubOrgVariables=(name,orgid)=>{
    return  {
        data:{
            name:name,
            org:orgid
        }
       
    }
}
// test('OrgWithout description',async ()=>{
//     await createSingleOrg({name:"ORGWithoutDescription"})
//     const [firstOrg,...other] = await prisma.query.organizations({where:{name:"ORGWithoutDescription"}})
//     expect(firstOrg.name).toBe('ORGWithoutDescription')
//     expect(firstOrg.description).toBeNull();
// })

// test('Should create a new org', async () => {
//     const variables={data:{name:"SEERVI3",description:"SEERVI ORG using SEED" }   } 
//     const response = await client.mutate({mutation: createOrg,variables})
//     const isOrgExist = await prisma.exists.Organization({id:response.data.createOrganization.id})
//     expect(isOrgExist).toBe(true)
// })
test('Create multiple orgs', async()=>{
    
    jsonData.orgs.forEach(async (sOrg)=>{
        const {name,description}={...sOrg}
        const response=await createSingleOrg({name,description})
        console.log("response",response)
        const [firstOrg,...other]=await prisma.query.organizations({where:{name}})
        expect(firstOrg.name).toBe(name)
        expect(firstOrg.description).toEqual(expect.stringContaining(name));

    })    
})
// test('Create multiple suborgs for created first org', async()=>{
//     const firstOrgDataName=jsonData.orgs[0].name
//     const [firstOrg,...other]=await prisma.query.organizations({where:{name:firstOrgDataName}})
//     const suborgs=jsonData.orgs[0].suborgs
//     console.log("suborgs",suborgs)
    
//     console.log("ORG before spread ",JSON.stringify(firstOrg),"  \n  Spread",firstOrg)
    
// })



// test('Test CreateSubOrg Assinging Org' , async ()=>{
//     const orgid=orgOne.organization.id
//     const variables=getSubOrgVariables("SubOrgTest",orgid)
//     const response = await client.mutate({
//         mutation: createSubOrg,
//         variables
//     })
//     const isSubOrgExist=await prisma.exists.SubOrg({id:response.data.createSubOrg.id})
//     const isSubOrgByName=await prisma.exists.SubOrg({name:"SubOrgTest"})
//     const subOrgByName=await prisma.query.subOrgs({where:{name:"SubOrgTest"}})
//     expect(isSubOrgExist).toBe(true)
//     expect(isSubOrgByName).toBe(true)
//     expect(subOrgByName[0].name).toBe('SubOrgTest')

// })

