
function allGroups(parent, args, { prisma }, info) {
    return prisma.query.groups(null, info)
}

function groupById(parent, args, { prisma }, info) {
   return prisma.query.group({
         where :{
            id:args.id
         }
    }, info)
}

export {allGroups,groupById}