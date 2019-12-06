import getUserId from '../../utils/getUserId'  
function createAddress(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.createAddress({
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
export default createAddress  
