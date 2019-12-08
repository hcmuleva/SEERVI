import getUserId from '../../../utils/getUserId'
function me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    
    return prisma.query.user({
        where: {
            id: userId
        }
    })
}
export default me