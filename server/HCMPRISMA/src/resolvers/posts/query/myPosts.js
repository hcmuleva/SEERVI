import getUserId from '../../../utils/getUserId'

function myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const opArgs = {
        where: {
            author: {
                id: userId
            }
        }
    }
    console.log("ARGS ",args, "and opArgs",opArgs)
    if (args.query) {
        opArgs.where.OR = [{
            title_contains: args.query
        }, {
            body_contains: args.query
        }]
    }

    return prisma.query.posts(opArgs, info)
}
export default myPosts