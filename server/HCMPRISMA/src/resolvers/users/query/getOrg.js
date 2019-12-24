function getOrg(parent, args, { prisma }, info) {
    return prisma.query.organizations(null, info)
}
export default  getOrg