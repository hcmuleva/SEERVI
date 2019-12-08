import getUserId from '../../../utils/getUserId'

async function post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false)

    const posts = await prisma.query.posts({
        where: {
            id: args.id,
            OR: [{
                published: true
            }, {
                author: {
                    id: userId
                }
            }]
        }
    }, info)

    if (posts.length === 0) {
        throw new Error('Post not found')
    }

    return posts[0]
}
export default post