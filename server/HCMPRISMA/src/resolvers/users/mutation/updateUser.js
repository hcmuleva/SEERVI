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
async function assignUserToRoles(parent, args, { prisma, request }, info) {   
     const data=args.data
     let rolelist=[]
     data.roles.map((elm)=>{
         rolelist.push(elm)
     })
     
     data['roles']={connect:rolelist}

    return prisma.mutation.updateUser({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
async function assignSubjectsToUser(parent, args, { prisma, request }, info) {   
     const data=args.data
     console.log("RECIEVED REQUEST for assignSubjectsToUser ",JSON.stringify(args))
     let subjectlist=[]
     data.subjectSubscription.map((elm)=>{
         subjectlist.push({id:elm.id})
     })
     
     data['subjectSubscription']={connect:subjectlist}
     if(data.subscribedAs){
         data['roles']={connect:{id:data.roles}}
     }
     console.log("JSON.stringify(data) ",JSON.stringify(data))
    return prisma.mutation.updateUser({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {updateUser,assignUserToRoles,assignSubjectsToUser}  
