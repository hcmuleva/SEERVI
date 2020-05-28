import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import {createOrg,orgInputData} from './orgmutation.js'
import {GET_SubOrgById} from './suborgquery'
import {createSuborg,createSubOrgInputData} from './suborgmutation'
import {creategroup,createGroupInputData,updategroup,updateGroupInputData} from './grouppmutation'
import {GET_AllGROUPS,GET_GROUPBYID} from './groupqueries'
import {createsubgroup,createSubGroupInputData,updatesubgroup,updateSubGroupInputData,deletesubgroup,deleteSubGroupInputData} from './subgroupmutation'
import {GET_AllSUBGROUPS,GET_SUBGROUPBYID} from './subgroupqueries'

export const  commonServiceTests = (name, client) => {
const  createSubGroupfunction=async (groupName, description, groupid)=>{
   console.log("PPAPRAMETER   ", groupName,description,groupid)
    const subgroupRELIGIOUSVariable=createSubGroupInputData(groupName,description,groupid )
    console.log("\n\nPPAPRAMETER   ", groupName,description,groupid,"subgroupRELIGIOUSVariable",subgroupRELIGIOUSVariable)
    await client.mutate({mutation:createsubgroup,variables:subgroupRELIGIOUSVariable}).then(async (SubGroupRELIGIOUSResonse)=>{
      expect(SubGroupRELIGIOUSResonse).not.toBeNull()
      expect(SubGroupRELIGIOUSResonse.data.createSubGroup.name).toBe(groupName)
   });
}
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
                     const subgroupVariable=createSubGroupInputData("ACADAMIC","ACADAMIC SUBGROUP IS FOR PUBLIC USE",GroupResonse.data.createGroup.id )
                     await client.mutate({mutation:createsubgroup,variables:subgroupVariable}).then(async (SubGroupResonse)=>{
                        expect(SubGroupResonse).not.toBeNull()
                        expect(SubGroupResonse.data.createSubGroup.name).toBe("ACADAMIC")
                        

                     });
                     const subgroupTutionVariable=createSubGroupInputData("TUTION","TUTION SUBGROUP IS FOR PUBLIC USE",GroupResonse.data.createGroup.id )
                     await client.mutate({mutation:createsubgroup,variables:subgroupTutionVariable}).then(async (SubGroupResonse)=>{
                        expect(SubGroupResonse).not.toBeNull()
                        expect(SubGroupResonse.data.createSubGroup.name).toBe("TUTION")
                     });
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
}
describe('Common Data For Test', () => {
  test('should be used per implementation', () => {});
});