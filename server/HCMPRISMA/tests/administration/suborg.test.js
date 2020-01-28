import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
import {createOrg,createOrgData} from './orgmutation.js'
import {createSubOrg,createSubOrgData} from './suborgmutation'
import { onError } from "apollo-link-error";
const client = getClient()
beforeAll( async ()=>{
    await prisma.mutation.deleteManyOrganizations()
    await prisma.mutation.deleteManySuborgs()
})

/**
 * administrator tests
 *
 * @group admin/regression
 * @group suborg/smoke
 */

describe( 'SubOrg  Suite ', () => {
    test('create SubOrg Positive Case', async ()=>{
        const orgVariables=createOrgData("ORGForSubOrg", "Test for Subscrition")
        client.mutate({mutation: createOrg, variables:orgVariables}).then(async (resp)=>{
            createdOrgId=resp.data.createOrganization.id
            console.log("ORG Created and orgResponse.data.createOrg.id:::",createdOrgId)
            const suborgVariables=createSubOrgData("SubORGForSubOrg", "Test for SubOrgscrition",createdOrgId)
            const subOrgResonse=await client.mutate({mutation:createSubOrg,variables:suborgVariables})
            const [firstSubOrg,...other] = await prisma.query.suborgs({where:{name:"SubORGForSubOrg"}})
            const suborgCreatedId=subOrgResonse.id
            const actualSubOrgId=subOrgResonse.data.createSubOrg.id
            const expectedSuborgid=createSubOrgId.id
            expect(expectedSuborgid).toBe(actualSubOrgId)
        })
        
        
       
    });
});