function allorgs(parent, args, { prisma }, info) {
    return prisma.query.organizations(null, info)
}

function orgById(parent, args, { prisma }, info) {
   return prisma.query.organization({
         where :{
            id:args.id
         }
    }, info)
}
function orgByname(parent, args, { prisma }, info) {
    return prisma.query.organizations(args.data, info)
}
export {allorgs,orgById,orgByname}