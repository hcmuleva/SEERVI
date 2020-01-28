function allorgs(parent, args, { prisma }, info) {
    return prisma.query.organizations(null, info)
}


function orgByname(parent, args, { prisma }, info) {
    return prisma.query.organizations(args.data, info)
}
export {allorgs,orgByname}