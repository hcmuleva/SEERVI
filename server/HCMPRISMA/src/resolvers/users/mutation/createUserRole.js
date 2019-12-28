import getUserId from '../../../utils/getUserId'

export default function createUserRole(parent, args, { prisma, request }, info) {
    return prisma.mutation.createUserRole({
        data: {
            user:{
                connect: {
                    id: args.data.user,
                }
            },
            role:{
                connect: {
                    id: args.data.role,
                }
            },
            group:{
                connect: {
                    id: args.data.group,
                }
            }
            
        }
    }, info)
}