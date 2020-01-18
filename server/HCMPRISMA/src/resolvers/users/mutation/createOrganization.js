import getUserId,{getUserFullDetails} from '../../../utils/getUserId'

 function createOrganization(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    console.log("CREATE ORGANIZATION data ",args," USER ID ",userId)
    return prisma.mutation.createOrganization({
        data: {
            name: args.data.name,
            description:args.data.description
        }
    }, info)
}
async function deleteOrganization(parent,args,{prisma,request},info){
    console.log("Called Delete organization",args)
    
    const userData=getUserFullDetails(request)
     console.log("userData.roles",userData)
    if(!userData.roles){
        throw new Error('Ypu are not authroized!!!!')
    }
    console.log("userData.roles",userData.roles)
    let hasSuperAdminRole = userData.roles.some( role => role['rolename'] === 'SUPERADMIN' )
    console.log("hasSuperAdminRole=",hasSuperAdminRole)
    if(!hasSuperAdminRole){
        throw new Error('Ypu are not authroized!!!!')
    }
    const orgExists = await prisma.exists.Organization({
        id: args.id
    })

    if (!orgExists) {
        throw new Error('Unable to delete Org')
    }

    return prisma.mutation.deleteOrganization({
        where: {
            id: args.id
        }
    }, info)
}
 

export {createOrganization,deleteOrganization}