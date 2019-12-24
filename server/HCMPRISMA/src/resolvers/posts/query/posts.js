async function posts(parent, args, { prisma }, info) {
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