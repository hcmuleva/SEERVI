function comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
}
export default  comments