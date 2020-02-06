import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
const client = getClient()
import {createOrg,orgInputData} from '../administration/orgmutation.js'
import {createSuborg,createSubOrgInputData} from '../administration/suborgmutation'
import {creategroup,createGroupInputData} from '../administration/grouppmutation'
import {createsubgroup,createSubGroupInputData} from '../administration/subgroupmutation'
import {userCreate} from '../users/usercommon'
import {createGroupMember} from '../administration/groupMemberMutation'
import {createUserRole} from '../administration/roleMemberMutation'
import {seedDataCreate} from './seeddata'
import {createOrgRole,createSubOrgRole,createGroupRole,createSubGroupRolegql,createSubGroupRoleInputData} from '../administration/roleMutation'
const  createUserFunction=async (firstname,lastname,email,password,orgid,suborgid)=>{
       return await userCreate(firstname,lastname,email,password,orgid,suborgid)
}
const roleAssigment=async (userid,role,status,description)=>{
    return await client.mutate({mutation:createUserRole, variables:{data:{userid,  role,   status,   description}}})
}
/**
 * seeddata tests
 * @group seed/createseed
 */
seedDataCreate('dummy',client)
describe( 'User Suite ', () => {
   test('Create SEERVI ORG for Demo', async ()=>{
        const orgVariables=orgInputData("SEERVI", "SEERVI ORG IS FOR PUBLIC USE")
        const createdOrgResp=await client.mutate({mutation: createOrg, variables:orgVariables})
        const createdOrgId=createdOrgResp.data.createOrganization.id
        const suborgVariables=createSubOrgInputData("KARI", "KARII SUBORG  IS FOR SEERVI USE",createdOrgId)
        const subOrgResponse=await client.mutate({mutation:createSuborg,variables:suborgVariables})
        const groupVariable=createGroupInputData("EDUCATION","EDUCATION GROUP IS FOR KARI SEERVI USE",subOrgResponse.data.createSubOrg.id )
        const groupResponse=await client.mutate({mutation:creategroup,variables:groupVariable})
        const subgroupVariable=createSubGroupInputData("ACADAMIC","ACADAMIC SUBGROUP IS FOR PUBLIC USE",groupResponse.data.createGroup.id )
        const subGroupResponse=await client.mutate({mutation:createsubgroup,variables:subgroupVariable})
        const collegeStudent=await userCreate("arpita","muleva","arpita@seervi.com","welcome123",createdOrgId,subOrgResponse.data.createSubOrg.id)  
        const middleStudent=await userCreate("krishna","muleva","krishna@seervi.com","welcome123",createdOrgId,subOrgResponse.data.createSubOrg.id)  
        const lkgStudent=await userCreate("aniudha","muleva","ani@seervi.com","welcome123",createdOrgId,subOrgResponse.data.createSubOrg.id)  
        const teacher=await userCreate("golu","patel","golu@seervi.com","welcome123",createdOrgId,subOrgResponse.data.createSubOrg.id)  
        const parent=await userCreate("Harish","Muleva","harish@seervi.com","welcome123",createdOrgId,subOrgResponse.data.createSubOrg.id)  
        console.log("subGroupResponse subGroupResponse.data.createSubGroup.id", subGroupResponse.data.createSubGroup.id)
        // Create Role
        //Starting Create  subgroup level roles: (SubGroup=ACADAMIC), Roles:TEACHER, STUDENT, PARENT
        const subgroupid=subGroupResponse.data.createSubGroup.id
        const teacherSubGroupveriable=createSubGroupRoleInputData("TEACHER1","TESt",subgroupid)
        console.log("REQUEST  ",teacherSubGroupveriable)
        const teacherRole=await client.mutate({mutation: createSubGroupRolegql,variables: teacherSubGroupveriable})
        const teacherId=teacher.data.createUser.user.id
        console.log("TEACHER ROLE CREATED successfully",teacherRole , " \n  TEACHER OBJ n\n", teacher)
        //Assign ROLE TO USER
        const teacherRoleAssignment=await roleAssigment(teacherId,teacherRole.data.createSubGroupRole.id,"ACTIVE","Testing Role")
        console.log("teacherRoleAssignment ",teacherRoleAssignment)
        //Assign Group to User
         // const groupMemberVariable={data:{userid:collegeStudent.data.createUser.user.id,member:backendGroups[0].id,status:"ACTIVE", description:"Created for UnitTest for groupmember"}}
    //    console.log("Data for user assign to group",groupMemberVariable)
    //     await client.mutate({mutation:createGroupMember,variables:groupMemberVariable})
   
        //Create Mutation for Role, Role Assignment  and GroupAssignment    
        //Asign Role

        



   });
});
