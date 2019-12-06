    
import getUserId from '../../utils/getUserId'
async function updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
        id: args.id,
        author: {
            id: userId
        }
    })

    if (!commentExists) {
        throw new Error('Unable to update comment')
    }

    return prisma.mutation.updateComment({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export default updateComment    
