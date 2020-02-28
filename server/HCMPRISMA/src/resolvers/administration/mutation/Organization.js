import { orgwithoutnameException} from '../../../exceptions/administrationException';
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
 

export {createOrganization,deleteOrg,updateOrg}