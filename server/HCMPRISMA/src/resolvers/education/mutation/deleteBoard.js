


async function deleteBoard(parent, args, { prisma, request }, info) {
    const boardExists = await prisma.exists.Board({
        id: args.id
       
    })

    if (!boardExists) {
        throw new Error('Unable to delete board')
    }

    return prisma.mutation.deleteBoard({
        where: {
            id: args.id
        }
    }, info)
}
export default deleteBoard