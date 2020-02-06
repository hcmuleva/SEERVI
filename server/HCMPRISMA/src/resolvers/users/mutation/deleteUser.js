import getUserId from '../../../utils/getUserId'
async function deleteUser(parent, args, { prisma, request }, info) {
    console.log("\n\nDELETE USER ID ", args, " \n\n")
    //const userId = getUserId(request)

    return prisma.mutation.deleteUser({
        where: {
            id: args.id
        }
    }, info)
}
export default deleteUser