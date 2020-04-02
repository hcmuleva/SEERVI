
async function getAllUnit(parent, args, { prisma }, info) {
    return await prisma.query.units(null, info)
   
}
export {getAllUnit}