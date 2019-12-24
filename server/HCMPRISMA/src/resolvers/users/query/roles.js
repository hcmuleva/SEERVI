function roles(parent, args, { prisma }, info) {
    return prisma.query.roles(null, info)
}
export default  roles