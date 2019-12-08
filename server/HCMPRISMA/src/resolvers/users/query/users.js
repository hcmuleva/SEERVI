function users(parent, args, { prisma }, info) {
    const opArgs = {}
    
    if (args.query) {
        opArgs.where = {
            OR: [{
                name_contains: args.query
            }, {
                email_contains: args.query
            }]
        }
    }

    return prisma.query.users(opArgs, info)
}
export default users
