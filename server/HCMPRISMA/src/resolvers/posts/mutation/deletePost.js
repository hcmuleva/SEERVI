import getUserId from '../../../utils/getUserId'

async function deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
        id: args.id,
        author: {
            id: userId
        }
    })
    if (!postExists) {
        throw new Error('Unable to delete post')
    }    
    return prisma.mutation.deletePost({
        where: {
            id: args.id
        }
    }, info)
}
export default deletePost