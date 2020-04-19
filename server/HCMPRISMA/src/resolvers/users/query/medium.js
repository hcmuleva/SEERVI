function getAllMedium(parent, args, { prisma }, info) {
    return prisma.query.mediums(null, info)
}
export {getAllMedium}