import getUserId from '../../../utils/getUserId'
function loggedInUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)  
    return prisma.query.user({
        where: {
            id: userId
        }
    })
}
function getMyOrg(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)  

    return prisma.query.organizations({

      where :{
            author_some:userId
         }
    })
}
export  {loggedInUser,getMyOrg}