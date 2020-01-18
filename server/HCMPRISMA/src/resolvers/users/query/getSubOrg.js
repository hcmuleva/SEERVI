function getSubOrgs(parent, args, { prisma }, info) {
    return prisma.query.subOrgs(null, info)
}
export default  getSubOrgs