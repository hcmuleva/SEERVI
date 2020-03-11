import hashPassword from '../../../utils/hashPassword'

import getUserId from '../../../utils/getUserId'   
async function updateUser(parent, args, { prisma, request }, info) {
    //const userId = getUserId(request)
    console.log("\n**********************WARNING**************************\n")
    console.log("\nNeed to keep extra validation logic for reset password. \n")
    console.log("\n********************************************************\n")
    if(typeof args.data.password === 'string'){
        args.data.password=await hashPassword(args.data.password)
    }
    return prisma.mutation.updateUser({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export default updateUser  
