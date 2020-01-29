import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
import {createOrg,orgInputData} from './orgmutation.js'
import {GET_SubOrgById} from './suborgquery'
import {createSuborg,createSubOrgInputData} from './suborgmutation'
import {creategroup,createGroupInputData,updategroup,updateGroupInputData} from './grouppmutation'
import {GET_AllGROUPS,GET_GROUPBYID} from './groupqueries'
import {createsubgroup,createSubGroupInputData,updatesubgroup,updateSubGroupInputData,deletesubgroup,deleteSubGroupInputData} from './subgroupmutation'
import {GET_AllSUBGROUPS,GET_SUBGROUPBYID} from './subgroupqueries'
import { onError } from "apollo-link-error";
const client = getClient()
beforeAll( async ()=>{
    console.log("CLEANING BOTH ORGS and SUBORGS")
    await prisma.mutation.deleteManyOrganizations()
    await prisma.mutation.deleteManySuborgs()
    await prisma.mutation.deleteManyGroups()
    await prisma.mutation.deleteManySubGroups()
})


/**
 * SubGroup tests
 *  @group regression
 *  @group smoke
 *  @group subgroup
 *  @group subgroup/regression
 *  @group subgroup/smoke
 *  @group subgroup/createSubGroup
 */

describe( 'Create SubGroup Suite ', () => {
    test('Create SubGroup Test', async ()=>{
        const orgVariables=orgInputData("ORGForSubGroupTest", "Test for Subscrition")
        await client.mutate({mutation: createOrg, variables:orgVariables}).then(async (resp)=>{
            const createdOrgId=resp.data.createOrganization.id
            const suborgVariables=createSubOrgInputData("SubORGFor_SubGroupTest", "Test for SubOrgscrition",createdOrgId)
            await client.mutate({mutation:createSuborg,variables:suborgVariables}).then(async (subOrgResonse)=>{
                console.log("SubORG Response ",subOrgResonse)
                const suborgCreatedId=subOrgResonse.data.createSubOrg.id
                const suborgExists = await prisma.exists.Suborg({id: suborgCreatedId})
                expect(suborgExists).toBe(true)
                console.log("SUBORG TESTPASSED")
                const groupVariable=createGroupInputData("Group_ForSubGroupTest","Test Group_ForSubGroupTest",suborgCreatedId )
                await client.mutate({mutation:creategroup,variables:groupVariable}).then(async (GroupResonse)=>{
                    console.log("CREATED Group", GroupResonse)

                     const subgroupVariable=createSubGroupInputData("SubGroup_ForSubGroupTest","Simple Test SubGroup",GroupResonse.data.createGroup.id )
                     await client.mutate({mutation:createsubgroup,variables:subgroupVariable}).then(async (SubGroupResonse)=>{
                        console.log("SubGroupResonse",SubGroupResonse)   
                        expect(SubGroupResonse).not.toBeNull()
                        expect(SubGroupResonse.data.createSubGroup.name).toBe("SubGroup_ForSubGroupTest")
                     });
                });

            })
        })
    });
});


/**
 * SubGroup tests
 *  @group regression
 *  @group smoke
 *  @group subgroup
 *  @group subgroup/regression
 *  @group subgroup/smoke
 *  @group subgroup/updateSubGroup
 */


describe( 'Update SubGroup Suite ', () => {
    test('Update SubGroup TestCase', async ()=>{
        const allSubGroups=await prisma.query.subGroups({})
        const backEndSubGroup=allSubGroups[0];
        console.log("backEndSubGroup",backEndSubGroup)
        const updateSubGroupvariables=updateSubGroupInputData(backEndSubGroup.id,"UppdatedSubGroupFromTestCase1")
        await client.mutate({mutation: updatesubgroup, variables:updateSubGroupvariables}).then(async (UdateSubGroupResponse)=>{
            expect(UdateSubGroupResponse).not.toBeNull()
            const updatedSubGroupRecieved=UdateSubGroupResponse.data.updateSubGroup
            expect(updatedSubGroupRecieved.name).toBe("UppdatedSubGroupFromTestCase1")
            expect(updatedSubGroupRecieved.id).toBe(backEndSubGroup.id)
            expect(updatedSubGroupRecieved.description).toBe(backEndSubGroup.description)
        });
        

    
    });
})


/**
 * SubGroup tests
 *  @group regression
 *  @group smoke
 *  @group subgroup
 *  @group subgroup/regression
 *  @group subgroup/smoke
 *  @group subgroup/querySubGroup
 */

describe( 'Query SubGroup Suite ', () => {
   test('Query SubGroup without arguments, need to return all subgroups', async ()=>{
        const backendSubGroups=await prisma.query.subGroups({}) 
        await client.query({query:GET_AllSUBGROUPS}).then((allSubGrpupQueryResponse)=>{
            console.log("allSubGrpupQueryResponse",allSubGrpupQueryResponse)
            expect(allSubGrpupQueryResponse).not.toBeNull()
            expect(backendSubGroups.length).toBe(allSubGrpupQueryResponse.data.allSubGroups.length)
        })
    });
    test('Query SubGroup by id and single Subgroup to be available ',async()=>{
        await prisma.query.subGroups({}).then(async (SubgroupsfromBackEnd)=>{
            const singleSubGroup=SubgroupsfromBackEnd[0]
            const subgrpByIdQueryResponse=await client.query({query:GET_SUBGROUPBYID,variables:{id:singleSubGroup.id}})
            const subgroupFromQuery=subgrpByIdQueryResponse.data.subgroupById
            expect(subgroupFromQuery.name).toBe(singleSubGroup.name)
            expect(subgroupFromQuery.id).toBe(singleSubGroup.id)
            
        })
         
    })
});


/**
 * SubGroup tests
 *  @group regression
 *  @group smoke
 *  @group subgroup
 *  @group subgroup/regression
 *  @group subgroup/smoke
 *  @group subgroup/deleteSubGroup
 */
 describe( 'Delete SubGroup Suite ', () => {
     test('Delete SubGroup: 1.GetAllSubGroup, now consider only one element, and delete, again query it should not there', async ()=>{
        await prisma.query.subGroups({}).then(async (backendSubGroups)=>{
            const firstSubGroup=backendSubGroups[0]
            console.log("firstSubGroup",firstSubGroup)
            const deletesuborgvariable=deleteSubGroupInputData(firstSubGroup.id)
             await client.mutate({mutation: deletesubgroup, variables:deletesuborgvariable}).then(async (resp)=>{
                 expect(resp).not.toBeNull()
                 console.log("RESPoNSE OF DELETED SUBORG ",resp)
             });
        }) 
     });
 });
