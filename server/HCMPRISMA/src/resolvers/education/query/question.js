async function getAllQuestion(parent, args, { prisma }, info) {
    return await prisma.query.questions(null, info)
   
}
export {getAllQuestion}