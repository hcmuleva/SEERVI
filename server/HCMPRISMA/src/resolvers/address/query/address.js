async function address(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false)

    const addresses = await prisma.query.addresses({
        where: {
            id: args.id,
            OR: [{
                published: true
            }, {
                author: {
                    id: userId
                }
            }]
        }
    }, info)

    if (addresses.length === 0) {
        throw new Error('Address not found')
    }

    return addresses[0]
}
export default address