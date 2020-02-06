
function assignUserToSubGroup(parent,args,{prisma,request},info){
    console.log("RECIEVED CREATED assignUserToSubGroup REQUEST",args.data)
     return prisma.mutation.createSubGroupMember({
        data: {
            status:args.data.status,    
            description:args.data.description,
            userid: {
                connect:{
                    id:args.data.userid
                }
            },
            member:{
               connect:{
                   id:args.data.member
               }
            }
        }
    }, info)
}



 async function deleteUserToSubGroup(parent, args, { prisma, request }, info) {
    const SubGroupMemberExists = await prisma.exists.SubGroupMember({
        id: args.id
        
    })
    if (!SubGroupMemberExists) {
        throw new Error('Unable to delete SubGroupMember')
    }    
    return prisma.mutation.deleteSubGroupMember({
        where: {
            id: args.id
        }
    }, info)
}
async function updateUserToSubGroup(parent, args, { prisma, request }, info) {
    const SubGroupMemberExists = await prisma.exists.SubGroupMember({
        id: args.id
        
    })
    if (!SubGroupMemberExists) {
        throw new Error('Unable to update SubGroupMember')
    }    
   return prisma.mutation.updateSubGroupMember({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}




export {assignUserToSubGroup,deleteUserToSubGroup,updateUserToSubGroup}
