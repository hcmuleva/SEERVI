import getUserId from '../../../utils/getUserId'

export default function createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.createComment({
        data: {
            text: args.data.text,
            author: {
                connect: {
                    id: userId
                }
            },
            post: {
                connect: {
                    id: args.data.post
                }
            }
        }
    }, info)
}
