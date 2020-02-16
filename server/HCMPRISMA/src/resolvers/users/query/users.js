function users(parent, args, { prisma }, info) {
    const opArgs = {}
    
    if (args.query) {
        opArgs.where = {
            OR: [{
                firstname_contains: args.query
            },{
                lastname_contains: args.query
            }, {
                email_contains: args.query
            }]
        }
    }

    return prisma.query.users(opArgs, info)
}
function getAllMedium(parent, args, { prisma }, info) {
    return prisma.query.mediums(null, info)
}

export {users,getAllMedium}
