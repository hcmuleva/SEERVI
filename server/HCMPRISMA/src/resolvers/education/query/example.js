
async function getAllExamples(parent, args, { prisma }, info) {
    return await prisma.query.examples(null, info)
   
}
export {getAllExamples}