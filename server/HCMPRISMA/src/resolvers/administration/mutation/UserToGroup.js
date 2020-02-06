
function assignUserToGroup(parent,args,{prisma,request},info){
    console.log("RECIEVED CREATED assignUserToGroup REQUEST",args.data)
     return prisma.mutation.createGroupMember({
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



 async function deleteUserToGroup(parent, args, { prisma, request }, info) {
    const GroupMemberExists = await prisma.exists.GroupMember({
        id: args.id
        
    })
    if (!GroupMember) {
        throw new Error('Unable to delete GroupMember')
    }    
    return prisma.mutation.deleteGroupMember({
        where: {
            id: args.id
        }
    }, info)
}
async function updateUserToGroup(parent, args, { prisma, request }, info) {
    const GroupMemberExists = await prisma.exists.GroupMember({
        id: args.id
        
    })
    if (!GroupMemberExists) {
        throw new Error('Unable to update GroupMember')
    }    
   return prisma.mutation.updateGroupMember({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}




export {assignUserToGroup,deleteUserToGroup,updateUserToGroup}
