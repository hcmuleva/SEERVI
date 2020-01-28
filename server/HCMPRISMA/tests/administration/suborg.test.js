import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
import {createOrg,orgInputData} from './orgmutation.js'
import {GET_SubOrgById} from './suborgquery'
import {createSuborg,createSubOrgInputData,deleteSubOrg,deleteSubOrgInputData,udateSubOrg,updateSubOrgInputData} from './suborgmutation'
import { onError } from "apollo-link-error";
const client = getClient()
beforeAll( async ()=>{
    console.log("CLEANING BOTH ORGS and SUBORGS")
    await prisma.mutation.deleteManyOrganizations()
    await prisma.mutation.deleteManySuborgs()
})


/**
 * SubOrg tests
 *  @group regression
 *  @group smoke
 *  @group suborg
 *  @group suborg/regression
 *  @group suborg/smoke
 *  @group suborg/createSubOrg
 */

describe( 'SubOrg Create Suite ', () => {
    test('Create SubOrg Positive Case', async ()=>{
        const orgVariables=orgInputData("ORGForSubOrg", "Test for Subscrition")
        await client.mutate({mutation: createOrg, variables:orgVariables}).then(async (resp)=>{
            const createdOrgId=resp.data.createOrganization.id
            const suborgVariables=createSubOrgInputData("SubORGForSubOrg", "Test for SubOrgscrition",createdOrgId)
            await client.mutate({mutation:createSuborg,variables:suborgVariables}).then(async (subOrgResonse)=>{
                const suborgCreatedId=subOrgResonse.data.createSubOrg.id
                const suborgExists = await prisma.exists.Suborg({id: suborgCreatedId})
                expect(suborgExists).toBe(true)
            })
        })
    });
});

/**
 * SubOrg tests
 *  @group regression
 *  @group smoke
 *  @group suborg
 *  @group suborg/regression
 *  @group suborg/smoke
 *  @group suborg/deleteSubOrg
 */

describe( 'SubOrg DeleteSubOrg Suite ', () => {
    test('Delete SubOrg Positive Case', async ()=>{
        const orgVariables=orgInputData("ORGForSubOrgForDelete", "Test for Delete Subscrition")
        await client.mutate({mutation: createOrg, variables:orgVariables}).then(async (resp)=>{
            const createdOrgId=resp.data.createOrganization.id
            const suborgVariables=createSubOrgInputData("SubORGForSubOrg", "Test for SubOrgscrition",createdOrgId)
            await client.mutate({mutation:createSuborg,variables:suborgVariables}).then(async (subOrgResonse)=>{
                const suborgCreatedId=subOrgResonse.data.createSubOrg.id
                expect(suborgCreatedId).not.toBeNull();
                const suborgExists = await prisma.exists.Suborg({id: suborgCreatedId})
                expect(suborgExists).toBe(true)
                const suborgDeleteVariables=deleteSubOrgInputData(suborgCreatedId)
                const subOrgDeleteResonse=await client.mutate({mutation:deleteSubOrg,variables:suborgDeleteVariables})
                const isDeletedOrgExist=await prisma.exists.Suborg({id: suborgCreatedId}) 
                expect(isDeletedOrgExist).toBe(false)

            })
        })
    });
});


/**
 * SubOrg tests
 *  @group regression
 *  @group smoke
 *  @group suborg
 *  @group suborg/regression
 *  @group suborg/smoke
 *  @group suborg/deleteSubOrg
 */

describe( 'SubOrg UdateSubOrg Suite ', () => {
    test('Udate SubOrg Positive Case', async ()=>{
        const orgVariables=orgInputData("ORGForSubOrgForUpdate", "Test for Udate Subscrition")
        await client.mutate({mutation: createOrg, variables:orgVariables}).then(async (resp)=>{
            const createdOrgId=resp.data.createOrganization.id
            const suborgVariables=createSubOrgInputData("SubORGForSubOrgUpdate", "Test for SubOrgscrition",createdOrgId)
            await client.mutate({mutation:createSuborg,variables:suborgVariables}).then(async (subOrgResonse)=>{
                const suborgCreatedId=subOrgResonse.data.createSubOrg.id
                expect(suborgCreatedId).not.toBeNull();
                const suborgExists = await prisma.exists.Suborg({id: suborgCreatedId})
                expect(suborgExists).toBe(true)
                const suborgUdateVariables=updateSubOrgInputData(suborgCreatedId, "ModifiedSubOrgWithName")
                console.log("suborgUdateVariables",suborgUdateVariables)
                await client.mutate({mutation:udateSubOrg,variables:suborgUdateVariables}).then(async (updateResponse)=>{
                    expect(updateResponse).not.toBeNull()
                    console.log("subOrgUdateResonse::::",updateResponse)
                    const suborgModifiedExists = await prisma.exists.Suborg({name:"ModifiedSubOrgWithName"})
                    expect(suborgModifiedExists).toBe(true)
                })
                

            })
        })
    });
});



/**
 * SubOrg tests
 *  @group regression
 *  @group smoke
 *  @group suborg
 *  @group suborg/regression
 *  @group suborg/smoke
 *  @group suborg/querySubOrg
 */

describe( 'Query SubOrgusing Tests ', () => {
    test('Query SubOrg with id', async ()=>{
        await prisma.query.suborgs({}).then(async (suborgsfromBackEnd)=>{
            const firstsubOrg=suborgsfromBackEnd[0]
            console.log("firstsubOrg",firstsubOrg)
            const suborgsQueryResponse=await client.query({query:GET_SubOrgById,variables:{id:firstsubOrg.id}})
            console.log("suborgsQueryResponse",suborgsQueryResponse)
            const recievedSubOrg=suborgsQueryResponse.data.suborgById
            expect(recievedSubOrg.name).toBe(firstsubOrg.name)
            expect(recievedSubOrg.id).toBe(firstsubOrg.id)
            
        })
    });
});

