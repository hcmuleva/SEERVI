import getUserId from '../../../utils/getUserId'
async function deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({
        where: {
            id: userId
        }
    }, info)
}
export default deleteUser