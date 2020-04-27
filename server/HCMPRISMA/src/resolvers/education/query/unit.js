
async function getAllUnit(parent, args, { prisma }, info) {
    return await prisma.query.units(null, info)
   
}

async function getUnitById(parent, args, { prisma ,request}, info) {
    return await prisma.query.unit( {
      where: { id: args.id } 
    }, info)
}

export {getAllUnit,getUnitById}