import { orgwithoutnameException} from '../../../exceptions/administrationException';
import hashPassword from '../../../utils/hashPassword'
 function createOrganization(parent, args, { prisma, request }, info) {
     if (!args.data.name) {
      throw new orgwithoutnameException();
    }
    return prisma.mutation.createOrganization({
        data: args.data
    }, info)
}
async function deleteOrg(parent, args, { prisma, request }, info) {
    console.log("DELETE ORG Request",args)
    const orgExists = await prisma.exists.Organization({
        id: args.id
        
    })
    if (!orgExists) {
        throw new Error('Unable to delete Organization')
    }    
    return prisma.mutation.deleteOrganization({
        where: {
            id: args.id
        }
    }, info)
}

async function updateOrg(parent, args, { prisma, request }, info) {
    console.log("Update ORG Request ", args)
    const orgExists = await prisma.exists.Organization({
        id: args.id
        
    })
    if (!orgExists) {
        throw new Error('Unable to update Organization')
    }    
   return prisma.mutation.updateOrganization({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
 
 async function orgOnboardBySuperAdmin(parent, args, { prisma, request }, info) {
     if (!args.data.name) {
      throw new orgwithoutnameException();
    }
    const orgdata=await prisma.mutation.createOrganization({
        data: args.data
    })
    console.log("ORG ONBOARD, create ORG ",orgdata)
    const suborg=await prisma.mutation.createSuborg({
         data:{
             name:"CONSUMERSUBORG",    
            description:"CONSUMERSUBORG CREATED while org onboarding",
             org: {
                connect:{
                    id:orgdata.id
                }
            }
         }
    })
    console.log("SUBORG ONBOARD, create ORG ",suborg)
    const orgadminRole= await prisma.mutation.createRole({
    data :{
      name: "ORGADMIN",
      description:"ROLE CREATED AUTOMATICALLY When org onboarded",
      org: {connect:{ id:orgdata.id}}
    }
    })
    console.log("orgadminRole ONBOARD, create ORG ",orgadminRole)
    const password =  await hashPassword("welcome123")

    console.log("PASSWORD ::: ",password)
    const email="ORGADMIN@"+orgdata.name+".com"
    const orgadminuserData= await prisma.mutation.createUser({
        data: {firstname:"ORGADMINONBOARDED",lastname:"ToBeUpddate",email,password,org:{connect: {id:orgdata.id}},suborg:{connect: {id: suborg.id}}}
        })
     console.log("orgadminuserData ONBOARD, create ORG ",orgadminuserData)
    const orgaddmiinRoleroleAssignment=await prisma.mutation.createRoleMember({
        data: {
            status:"ACTIVE",    
            description:"ONBOARD TIME ROLE ASSIIGMENT",
            userid: {
                connect:{
                    id:orgadminuserData.id
                }
            },
            role:{
               connect:{
                   id:orgadminRole.id
               }
            }
        }
    })
    console.log("orgaddmiinRoleroleAssignment ONBOARD, create ORG ",orgaddmiinRoleroleAssignment)
    return orgdata
}
export {createOrganization,deleteOrg,updateOrg,orgOnboardBySuperAdmin}