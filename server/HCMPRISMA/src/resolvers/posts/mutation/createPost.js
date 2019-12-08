import getUserId from '../../../utils/getUserId'

export default function createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    console.log("CreatePost Mutation.js userID:: ",userId," ARGS::",args)
    return prisma.mutation.createPost({
        data: {
            title: args.data.title,
            body: args.data.body,
            published: args.data.published,
            author: {
                connect: {
                    id: userId
                }
            }
        }
    }, info)
}
