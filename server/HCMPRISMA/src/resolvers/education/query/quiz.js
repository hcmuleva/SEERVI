async function getAllQuiz(parent, args, { prisma }, info) {
    return await prisma.query.quizzes(null, info)
   
}
async function getSingleQuiz(parent, args, { prisma }, info) {
    return await prisma.query.Quiz({
    where :{
       id:args.id
    }  
}, info)
}
export {getAllQuiz,getSingleQuiz}