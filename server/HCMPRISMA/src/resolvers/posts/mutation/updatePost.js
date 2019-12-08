import getUserId from '../../../utils/getUserId'

async function updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
        id: args.id,
        author: {
            id: userId
        }
    })

    if (!postExists) {
        throw new Error('Unable to update post')
    }

    return prisma.mutation.updatePost({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export default updatePost