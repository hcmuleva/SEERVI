function posts(parent, args, { prisma }, info) {
    const opArgs = {
        where: {
            published: true
        }
    }

    if (args.query) {
        opArgs.where.OR = [{
            title_contains: args.query
        }, {
            body_contains: args.query
        }]
    }

    return prisma.query.posts(opArgs, info)
}
export default posts;