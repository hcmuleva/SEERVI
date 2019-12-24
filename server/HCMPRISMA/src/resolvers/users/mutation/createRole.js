import getUserId from '../../../utils/getUserId'

export default function createRole(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.mutation.createRole({
        data: {
            roleName: args.data.roleName,
            users: {
                connect: {
                    id: args.data.users
                }
            },
            orgs:{
                connect: {
                    id: args.data.orgs
                }
            },
            createdBy:args.data.createdBy
            
        }
    }, info)
}