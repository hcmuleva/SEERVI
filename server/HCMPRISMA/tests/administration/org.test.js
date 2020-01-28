import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
import {createOrg,orgInputData,deleteOrg,deleteOrgInputData,updateOrg,updateOrgInputData} from './orgmutation.js'
import { onError } from "apollo-link-error";
const client = getClient()
beforeAll( async ()=>{
    await prisma.mutation.deleteManyOrganizations()
})
/**
 * administrator tests
 *  @group regression
 *  @group admin/regression
 *  @group admin/smoke
 *  @group admin/createorg
 */

describe( 'Org Create ', () => {
    test('create Org Positive Case', async ()=>{
        const variables=orgInputData("TESTORG", "TestDescriptions")
        const response = await client.mutate({mutation: createOrg, variables})
        const [firstOrg,...other] = await prisma.query.organizations({where:{name:"TESTORG"}})
        const createOrgId=response.data.createOrganization.id
        const expected=firstOrg.id
        expect(createOrgId).toBe(expected)
    });
    
})

/**
 * administrator tests
 *  @group regression
 *  @group admin/regression
 *  @group admin/smoke
 *  @group admin/deleteorg
 */

describe( 'Org delete ', () => {
    test('Delete Org Positive Case', async ()=>{
        const variables=orgInputData("TESTORGForDelete", "TestOrg for delete operationDescriptions")
        await client.mutate({mutation: createOrg, variables}).then(async (createOrgResponse)=>{
            const deleteOrgVariable=deleteOrgInputData(createOrgResponse.data.createOrganization.id)
            const deleteOrgResponse = await client.mutate({mutation: deleteOrg, variables:deleteOrgVariable})  
            const orgExists = await prisma.exists.Organization({id: deleteOrgResponse.data.deleteOrg.id})
            expect(orgExists).toBe(false)
        })

    
    });
})

/**
 * administrator tests
 *  @group regression
 *  @group admin/regression
 *  @group admin/smoke
 *  @group admin/updateorg
 */
describe( 'Org update ', () => {
    test('Update Org Positive Case', async ()=>{
        const variables=orgInputData("TESTORGForUpdate", "TestOrg for Update operationDescriptions")
        await client.mutate({mutation: createOrg, variables}).then(async (createOrgResponse)=>{
            const updateOrgData=updateOrgInputData(createOrgResponse.data.createOrganization.id,"ModifiedTESTORGForUpdate","")
            const updateOrgResponse = await client.mutate({mutation: updateOrg, variables:updateOrgData})  
            const orgExists = await prisma.exists.Organization({name:"ModifiedTESTORGForUpdate"})
            expect(orgExists).toBe(true)
        })

    
    });
})


describe( 'Org Suite for full test ', () => {  
    test('create Org Positive Case WithoutDescription', async ()=>{
        const variables=orgInputData("TESTORG1",null)   
        const response = await client.mutate({mutation: createOrg, variables})
        const [firstOrg,...other] = await prisma.query.organizations({where:{name:"TESTORG1"}})
        const createOrgId=response.data.createOrganization.id
        const expected=firstOrg.id
        expect(createOrgId).toBe(expected)
    });

    test('create Org Negative: Org withoutname', async ()=>{
        const variables=orgInputData('',null)
        try{
            const {response, error} = await client.mutate({mutation: createOrg, variables})
            const [firstOrg,...other] = await prisma.query.organizations({where:{name:null}})
            const createOrgId=response.data.createOrganization.id
            const expected=firstOrg.id
            expect(createOrgId).toBe(expected)
        }catch(err){
            console.log("HCMFound Error ",err.message)
            expect("GraphQL error: Organization creation failed, because organization name can not be null").toBe(err.message)
        }
       
        
    });
})

