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
const client = getClient()

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

const  createSubGroupfunction=async (groupName, description, groupid)=>{
   console.log("PPAPRAMETER   ", groupName,description,groupid)
    const subgroupRELIGIOUSVariable=createSubGroupInputData(groupName,description,groupid )
    console.log("\n\nPPAPRAMETER   ", groupName,description,groupid,"subgroupRELIGIOUSVariable",subgroupRELIGIOUSVariable)
    await client.mutate({mutation:createsubgroup,variables:subgroupRELIGIOUSVariable}).then(async (SubGroupRELIGIOUSResonse)=>{
        console.log("HARISH TEST",SubGroupRELIGIOUSResonse)
      expect(SubGroupRELIGIOUSResonse).not.toBeNull()
      expect(SubGroupRELIGIOUSResonse.data.createSubGroup.name).toBe(groupName)
   });
}
						
/**
 * SubGroup tests
 *  @group subgroup/CONSUMERDATA
 */

describe( 'Create SubGroup Suite ', () => {
       test('Create SubGroup Test', async ()=>{
        const orgVariables=orgInputData("CONSUMERORG", "CONSUMER ORG IS FOR PUBLIC USE")
        await client.mutate({mutation: createOrg, variables:orgVariables}).then(async (resp)=>{
            const createdOrgId=resp.data.createOrganization.id
            const suborgVariables=createSubOrgInputData("CONSUMERSUBORG", "CONSUMERSUBORG SUBORG IS FOR PUBLIC USE",createdOrgId)
            await client.mutate({mutation:createSuborg,variables:suborgVariables}).then(async (subOrgResonse)=>{
                const suborgCreatedId=subOrgResonse.data.createSubOrg.id
                const suborgExists = await prisma.exists.Suborg({id: suborgCreatedId})
                expect(suborgExists).toBe(true)
                const groupVariable=createGroupInputData("EDUCATION","EDUCATION GROUP IS FOR PUBLIC USE",suborgCreatedId )
                await client.mutate({mutation:creategroup,variables:groupVariable}).then(async (GroupResonse)=>{
                     createSubGroupfunction("EDUCATION","EDUCATION  IS FOR PUBLIC USE_SEED",GroupResonse.data.createGroup.id )
                     createSubGroupfunction("TUTION","TUTION  IS FOR PUBLIC USE_SEED",GroupResonse.data.createGroup.id )
                });
                const groupSPORTSVariable=createGroupInputData("SPORTS","SPORTS GROUP IS FOR PUBLIC USE",suborgCreatedId )
                await client.mutate({mutation:creategroup,variables:groupSPORTSVariable}).then(async (GroupSPORTSResonse)=>{
                      createSubGroupfunction("CRICKET","CRICKET  IS FOR PUBLIC USE_SEED",GroupSPORTSResonse.data.createGroup.id )
                      createSubGroupfunction("KABBADI","KABBADI  IS FOR PUBLIC USE_SEED",GroupSPORTSResonse.data.createGroup.id )
                });
                const groupNEWSVariable=createGroupInputData("NEWS","NEWS GROUP IS FOR PUBLIC USE",suborgCreatedId )
                await client.mutate({mutation:creategroup,variables:groupNEWSVariable}).then(async (GroupNEWSResonse)=>{
                     createSubGroupfunction("GK","MOTIVATION GK IS FOR PUBLIC USE_SEED",GroupNEWSResonse.data.createGroup.id )
                     createSubGroupfunction("MINDDEVELOPMENT","MINDDEVELOPMENT SUBGROUP IS FOR PUBLIC USE_SEED",GroupNEWSResonse.data.createGroup.id )
                     createSubGroupfunction("MOTIVATION","MOTIVATION SUBGROUP IS FOR PUBLIC USE_SEED",GroupNEWSResonse.data.createGroup.id )
                     createSubGroupfunction("RELIGIOUS","RELIGIOUS SUBGROUP IS FOR PUBLIC USE_SEED",GroupNEWSResonse.data.createGroup.id )
                     createSubGroupfunction("SPORTS","SPORTS SUBGROUP IS FOR PUBLIC USE_SEED",GroupNEWSResonse.data.createGroup.id )
                });

            })
        })
    });
});