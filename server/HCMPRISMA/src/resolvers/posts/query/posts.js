import getUserId from '../../../utils/getUserId'

async function posts(parent, args, { prisma ,request}, info) {
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

    return posts
}
export default posts;