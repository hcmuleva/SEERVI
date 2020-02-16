import getUserId from '../../../utils/getUserId'

function mySubscription(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const opArgs = {
        where: {
            userid: {
                id: userId
            }
        }
    }
    console.log("ARGS ",args, "and opArgs",opArgs)
  

    return prisma.query.subjectSubscriptions(opArgs, info)
}
async function getAllSubjects(parent, args, { prisma ,request}, info) {
    const subjects = await prisma.query.subjects(null, info)

    return subjects
}
async function getAllSubjectSubscription(parent, args, { prisma ,request}, info) {
    const subjectsubscription = await prisma.query.subjectSubscriptions(null, info)

    return subjectsubscription
}

export  {getAllSubjects,getAllSubjectSubscription,mySubscription};