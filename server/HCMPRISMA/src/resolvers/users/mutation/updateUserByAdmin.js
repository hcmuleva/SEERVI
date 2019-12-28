import getUserId from '../../../utils/getUserId'   
async function updateUserByAdmin(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    console.log("args for update",args.data)
    if(typeof args.data.password === 'string'){
        args.data.password=await hashPassword(args.data.password)
    }
    console.log("typeof args.data.roles",typeof args.data.roles)
    if (args.data.roles instanceof Array) {
        console.log("IF and array and value",args.data.roles,"userId",userId)
    } else {
        console.log("else  and not array")
    }
    
    return prisma.mutation.updateUser({
        where: {
            id: userId
        }

    }, info)
}
export default updateUserByAdmin  
