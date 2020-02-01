import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
import {createOrg,orgInputData} from './orgmutation.js'
import {GET_SubOrgById} from './suborgquery'
import {createSuborg,createSubOrgInputData} from './suborgmutation'
import {creategroup,createGroupInputData,updategroup,updateGroupInputData,deletegroup,deleteGroupInputData} from './grouppmutation'
import {GET_AllGROUPS,GET_GROUPBYID} from './groupqueries'
import { onError } from "apollo-link-error";
const client = getClient()



/**
 * Group tests
 *  @group regression
 *  @group smoke
 *  @group group
 *  @group group/regression
 *  @group group/smoke
 *  @group group/createGroup
 */

describe( 'Create Group Suite ', () => {
    test('Create Group Test', async ()=>{
        const orgVariables=orgInputData("ORGForSubOrg", "Test for Subscrition")
        await client.mutate({mutation: createOrg, variables:orgVariables}).then(async (resp)=>{
            const createdOrgId=resp.data.createOrganization.id
            const suborgVariables=createSubOrgInputData("SubORGForSubOrg", "Test for SubOrgscrition",createdOrgId)
            await client.mutate({mutation:createSuborg,variables:suborgVariables}).then(async (subOrgResonse)=>{
                const suborgCreatedId=subOrgResonse.data.createSubOrg.id
                const suborgExists = await prisma.exists.Suborg({id: suborgCreatedId})
                expect(suborgExists).toBe(true)
                const groupVariable=createGroupInputData("SubORGForSubOrg_Group","Simple Test Group",suborgCreatedId )
                console.log("groupVariable",groupVariable , " and createGroup ",creategroup)
                await client.mutate({mutation:creategroup,variables:groupVariable}).then(async (GroupResonse)=>{
                    console.log("CREATED Group", GroupResonse)
                    expect(GroupResonse).not.toBeNull()
                    expect(GroupResonse.data.createGroup.name).toBe("SubORGForSubOrg_Group")
                });

            })
        })
    });
});


/**
 * Group tests
 *  @group regression
 *  @group smoke
 *  @group group
 *  @group group/regression
 *  @group group/smoke
 *  @group group/updateGroup
 */

describe( 'Update Group Suite ', () => {
    test('Update Group TestCase', async ()=>{
        const allGroups=await prisma.query.groups({})
        const backEndGroup=allGroups[0];
        console.log("backEndGroup",backEndGroup)
        const updateGroupvariables=updateGroupInputData(backEndGroup.id,"UppdatedFromTestCase1")
        await client.mutate({mutation: updategroup, variables:updateGroupvariables}).then(async (UdateGroupResponse)=>{
            expect(UdateGroupResponse).not.toBeNull()
            const updatedGroupRecieved=UdateGroupResponse.data.updateGroup
            expect(updatedGroupRecieved.name).toBe("UppdatedFromTestCase1")
            expect(updatedGroupRecieved.id).toBe(backEndGroup.id)
            expect(updatedGroupRecieved.description).toBe(backEndGroup.description)
        });
        

    
    });
})


/**
 * Group tests
 *  @group regression
 *  @group smoke
 *  @group group
 *  @group group/regression
 *  @group group/smoke
 *  @group group/queryGroup
 */

//GET_AllGROUPS,GET_GROUPBYID
describe( 'Query Group Suite ', () => {
   test('Query Group without arguments, need to return all groups', async ()=>{
        const backendGroups=await prisma.query.groups({}) 
        const allGrpupQueryResponse = await client.query({query:GET_AllGROUPS})
        expect(allGrpupQueryResponse).not.toBeNull()
        expect(backendGroups.length).toBe(allGrpupQueryResponse.data.allGroups.length)
         
    });

    test('Query Group by id and single group to be available ',async()=>{
        await prisma.query.groups({}).then(async (groupsfromBackEnd)=>{
            const singleGroup=groupsfromBackEnd[0]
            const grpByIdQueryResponse=await client.query({query:GET_GROUPBYID,variables:{id:singleGroup.id}})
            const groupFromQuery=grpByIdQueryResponse.data.groupById
            expect(groupFromQuery.name).toBe(singleGroup.name)
            expect(groupFromQuery.id).toBe(singleGroup.id)
            
        })
         
    })
})


/**
 *  Group tests
 *  @group regression
 *  @group smoke
 *  @group group
 *  @group group/regression
 *  @group group/smoke
 *  @group group/deleteGroup
 */
 describe( 'Delete Group Suite ', () => {
     test('Delete Group: 1.GetAllGroup, now consider only one element, and delete, again query it should not there', async ()=>{
        await prisma.query.groups({}).then(async (backendGroups)=>{
            console.log("BACKEND GROUPP ",backendGroups)
            const firstGroup=backendGroups[0]
            const deleteGrouppvariable=deleteGroupInputData(firstGroup.id)
             await client.mutate({mutation: deletegroup, variables:deleteGrouppvariable}).then(async (resp)=>{
                 expect(resp).not.toBeNull()
             });
        }) 
     });
 });
