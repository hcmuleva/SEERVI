function getSubOrg(parent, args, { prisma }, info) {
    return prisma.query.subOrg(null, info)
}
export default  getSubOrg