async function getAllStd(parent, args, { prisma }, info) {
    return await prisma.query.stds(null, info)
   
}
export {getAllStd}