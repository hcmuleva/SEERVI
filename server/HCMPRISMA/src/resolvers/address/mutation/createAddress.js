import getUserId from '../../../utils/getUserId'  
function createAddress(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.createAddress({
        data: {
            title: args.data.title,
            body: args.data.body,
            published: args.data.published,
            landmark:args.data.landmark,
            author: {
                connect: {
                    id: userId
                }
            },
            baseAddress:{
                connect:{
                    id:args.data.baseAddress
                }
            }
        }
    }, info)
}
export default createAddress  
