
function allSubGroups(parent, args, { prisma }, info) {
    return prisma.query.subGroups(null, info)
}

function subgroupById(parent, args, { prisma }, info) {
   return prisma.query.subGroup({
         where :{
            id:args.id
         }
    }, info)
}

export {allSubGroups,subgroupById}