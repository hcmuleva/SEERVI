
function allSubGroups(parent, args, { prisma }, info) {
    return prisma.query.subGroups(null, info)
}
async function subgroupsOfGroup(parent, args, { prisma }, info) {
    return await prisma.query.subGroups({
        groupid:{connect:{id:args.id}} 
      
    }, info)
}
function subgroupById(parent, args, { prisma }, info) {
    console.log("ARGS fpr subgroup by id ", args)
   return prisma.query.subGroup({
         where :{
            id:args.id
         }
    }, info)
}

export {allSubGroups,subgroupById,subgroupsOfGroup}