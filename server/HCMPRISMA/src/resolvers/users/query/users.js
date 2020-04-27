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

function usersRoleId(parent, args, { prisma }, info) {
    
    return prisma.query.users({
        roles:{connect:{id:args.id}} 

    }, info)
} 

export {users,usersRoleId}
