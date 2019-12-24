async function addresses(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false)
    const opArgs = {
    }

    if (args.query) {
        opArgs.where.OR = [{
            pincode: args.query
        }, {
            district: args.query
        }]
    }
    const baseaddress= prisma.query.baseaddress(opArgs, info)
    const addresses=prisma.query.addresses({baseaddress:baseaddress.id})

    if (addresses.length === 0) {
        throw new Error('Address not found')
    }

    return addresses
}
export default addresses