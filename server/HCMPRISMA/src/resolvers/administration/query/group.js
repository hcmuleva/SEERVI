
function allGroups(parent, args, { prisma }, info) {
    return prisma.query.groups(null, info)
}

 async function groupsOfSubOrg(parent, args, { prisma }, info) {
    return await prisma.query.groups({
        suborgid:{connect:{id:args.id}} 
      
    }, info)
}
function groupById(parent, args, { prisma }, info) {
   return prisma.query.group({
         where :{
            id:args.id
         }
    }, info)
}

export {allGroups,groupById,groupsOfSubOrg}