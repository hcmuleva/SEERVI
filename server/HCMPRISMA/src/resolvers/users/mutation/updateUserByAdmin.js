import getUserId from '../../../utils/getUserId'   
async function updateUserByAdmin(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    console.log("args for update",args.data)
    if(typeof args.data.password === 'string'){
        args.data.password=await hashPassword(args.data.password)
    }
   
    return prisma.mutation.updateUser({
        where: {
            id: userId
        }

    }, info)
}
export default updateUserByAdmin  
