import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
import  {createUser,deleteUser,updateUser} from '../users/userMutation'
import {createGroupMember} from './groupMemberMutation'
import {commonServiceTests} from '../administration/commonData.test'
import {userCreate} from '../users/usercommon'
const client = getClient()

/**
 * GroupMemeber tests
 *  @group regression
 *  @group smoke
 *  @group user
 *  @depends-on groupmember/smoke
 *  @group groupmember/regression
 *  @group groupmember/smoke
 *  @group groupmember/createRelationship
 */
 commonServiceTests('InMemory',client)
const userCreateFunction=async (firstname,lastname,email,password,orgid,suborgid)=>{
       return await userCreate(firstname,lastname,email,password,orgid,suborgid)
}
describe( 'GroupSuite Suite ', () => {
   test('GroupSuite User for CONSUMERORG', async ()=>{
       const backendORGS=await prisma.query.organizations({}) 
       let orgid
       let suborgid
       backendORGS.map(org=>{ if(org.name=="CONSUMERORG"){ orgid=org.id } })
       const backendSUBORGS=await prisma.query.suborgs({}) 
       const backendGroups=await prisma.query.groups({})
       console.log("backendGroups",backendGroups)
       backendSUBORGS.map(suborg=>{if(suborg.name=="CONSUMERSUBORG"){ suborgid=suborg.id } })
       const firstUser=await userCreateFunction('GroupMemberUser1','muleva','GroupMemberUser1@aa1.com','welcome123',orgid,suborgid)
       const secondUser=await userCreateFunction('GroupMemberUser2','muleva','GroupMemberUser1@aa2.com','welcome123',orgid,suborgid)
       const thirdUser=await userCreateFunction('GroupMemberUser3','muleva','GroupMemberUser1@aa3.com','welcome123',orgid,suborgid)
       const groupMemberVariable={data:{userid:firstUser.data.createUser.user.id,member:backendGroups[0].id,status:"ACTIVE", description:"Created for UnitTest for groupmember"}}
       console.log("Data for user assign to group",groupMemberVariable)
        await client.mutate({mutation:createGroupMember,variables:groupMemberVariable}).then((grpmemResp)=>{
            console.log("grpmemResp",grpmemResp)
        }) 
        
    }) 
}); 