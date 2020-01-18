import getUserId from '../../../utils/getUserId'

export default function createRole(parent, args, { prisma, request }, info) {
    return prisma.mutation.createRole({
        data: {
            rolename: args.data.rolename,
            rolelevel:args.data.rolelevel,
            levelname:args.data.levelname,
            userid:{
                connect:{
                    id:args.data.userid
                }
            }
            
        }
    }, info)
}