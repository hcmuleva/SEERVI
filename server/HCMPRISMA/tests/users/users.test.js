import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import getClient from '../utils/getClient'
import  {createUser,deleteUser,updateUser} from './userMutation'
import {userCreate} from './usercommon'
const client = getClient()
import {commonServiceTests} from '../administration/commonData.test'
/***
TestCase1: Create User with Consumer ORG and SubORG
TestCase2: Create USer with NONCONSUMER ORG and SUBORG
TestCase3: Query User to getORG and SUBORG
TestCase4: DELETE User 
TestCase5 update USER

 */
commonServiceTests('InMemory',client)
const  createUserFunction=async (firstname,lastname,email,password,orgid,suborgid)=>{
       await userCreate(firstname,lastname,email,password,orgid,suborgid).then(async (createUserResp)=>{
           console.log("CREATE USER RESP", createUserResp)
           const {email, firstname,lastname}= createUserResp.data.createUser.user
           expect(email).toBe(email)
           expect(lastname).toBe(lastname)
           expect(firstname).toBe(firstname)
       }).catch((error)=>{
            expect(error).not.toBeNull()
            expect(email).toBe(email)
       })
}
/**
 * SubGroup tests
 *  @group regression
 *  @group smoke
 *  @group user
 *  @depends-on subgroup/smoke
 *  @group user/regression
 *  @group user/smoke
 *  @group user/createUser
 */

describe( 'User Suite ', () => {
   test('Create User for CONSUMERORG', async ()=>{
       const backendORGS=await prisma.query.organizations({}) 
       let orgid
       let suborgid
       backendORGS.map(org=>{ if(org.name=="CONSUMERORG"){ orgid=org.id } })
       const backendSUBORGS=await prisma.query.suborgs({}) 
       backendSUBORGS.map(suborg=>{if(suborg.name=="CONSUMERSUBORG"){ suborgid=suborg.id } })
       await createUserFunction('harish1','muleva','hcm@aa1.com','welcome123',orgid,suborgid)
       await createUserFunction('harish2','muleva','hcm@aa2.com','welcome123',orgid,suborgid)
       await createUserFunction('harish3','muleva','hcm@aa3.com','welcome123',orgid,suborgid)

    }) 

     //Update USer TestCase End
    test('Update User', async ()=>{
        await prisma.query.users({email:"hcm@aa1.com"}).then(async (userQueryResp)=>{
            let userIdForUpdate;
            userQueryResp.map((userdata)=>{                
                if(userdata.email==='hcm@aa1.com') { userIdForUpdate=userdata.id}
            })
            const updateUserVariable={id:userIdForUpdate, data:{firstname:"ModifiedFromHarish"}}
           await client.mutate({mutation: updateUser, variables:updateUserVariable}).then( (resp)=>{
               console.log("\n\n****UpdateUSerresp",resp, "\n*******\n\n")
               const {id,email,firstname,lastname}=resp.data.updateUser
               expect(id).toBe(userIdForUpdate)
               expect(email).toBe('hcm@aa1.com')
               expect(firstname).toBe('ModifiedFromHarish')
               expect(lastname).toBe('muleva')

               });
             
        })
       
    })

   //Delete USer TestCase End
    test('Delete User', async ()=>{
        await prisma.query.users({
            email:"hcm@aa1.com" 
            
        }).then(async (userQueryResp)=>{
            let userIdForDelete;
            console.log("userQueryResp",userQueryResp)
            userQueryResp.map((userdata)=>{
                
                if(userdata.email==='hcm@aa1.com') {
                    
                    userIdForDelete=userdata.id
                }
            })
           await client.mutate({mutation: deleteUser, variables:{id:userIdForDelete}}).then( (resp)=>{
               console.log("\n\n****resp",resp, "\n*******\n\n")
               const {id,email,firstname,lastname}=resp.data.deleteUser
               expect(id).toBe(userIdForDelete)
               expect(email).toBe('hcm@aa1.com')
               expect(firstname).toBe('ModifiedFromHarish')
               expect(lastname).toBe('muleva')

               });
             
        })
       
    });
   
});