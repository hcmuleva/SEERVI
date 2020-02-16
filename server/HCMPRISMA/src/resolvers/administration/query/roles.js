import getUserId from '../../../utils/getUserId'


async function allRoles(parent, args, { prisma }, info) {
    return await prisma.query.roles(null, info)
}

async function myRoles(parent, args, { prisma ,request}, info) {
    const user = getUserId(request) 
   return await prisma.query.roleMembers({
       where: {userid:{id:user }}
        
    }, info)
  
}

export {allRoles,myRoles}