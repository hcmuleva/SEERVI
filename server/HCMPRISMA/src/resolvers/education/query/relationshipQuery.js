
async function getEducationRelationship(parent, args, { prisma }, info) {
    return await prisma.query.educationRelationships(null, info)
   
}
export {getEducationRelationship}