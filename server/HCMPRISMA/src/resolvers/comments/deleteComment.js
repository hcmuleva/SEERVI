import getUserId from '../../utils/getUserId'

async function deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
        id: args.id,
        author: {
            id: userId
        }
    })

    if (!commentExists) {
        throw new Error('Unable to delete comment')
    }

    return prisma.mutation.deleteComment({
        where: {
            id: args.id
        }
    }, info)
}
export default deleteComment