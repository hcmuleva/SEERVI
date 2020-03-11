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

async function orgRoles(parent, args, { prisma ,request}, info) {
    console.log("RECIVED REQUEST FOR orgRoles",args)
   return await prisma.query.roles({
       where: {org:{id:args.id }}
        
    }, info)
  
}
async function suborgRoles(parent, args, { prisma ,request}, info) {
   return await prisma.query.roles({
       where: {suborg:{id:args.id }}
        
    }, info)
  
}
async function groupRoles(parent, args, { prisma ,request}, info) {
   return await prisma.query.roles({
       where: {group:{id:args.id }}
        
    }, info)
  
}
async function subGroupRoles(parent, args, { prisma ,request}, info) {
   return await prisma.query.roles({
       where: {subgroup:{id:args.id }}
        
    }, info)
  
}
export {allRoles,myRoles,orgRoles,suborgRoles,groupRoles,subGroupRoles}