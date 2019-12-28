import getUserId from '../../../utils/getUserId'

export default function createRole(parent, args, { prisma, request }, info) {
    return prisma.mutation.createRole({
        data: {
            roleName: args.data.roleName
            
        }
    }, info)
}