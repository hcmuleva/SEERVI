import getUserId from '../../utils/getUserId'
    
async function updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    if(typeof args.data.password === 'string'){
        args.data.password=await hashPassword(args.data.password)
    }
    return prisma.mutation.updateUser({
        where: {
            id: userId
        },
        data: args.data
    }, info)
}
export default updateUser  
