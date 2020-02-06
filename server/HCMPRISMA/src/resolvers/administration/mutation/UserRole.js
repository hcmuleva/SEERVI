
function createUserRole(parent,args,{prisma,request},info){
    console.log("RECIEVED CREATED createUserRole REQUEST",args.data)
     return prisma.mutation.createRoleMember({
        data: {
            status:args.data.status,    
            description:args.data.description,
            userid: {
                connect:{
                    id:args.data.userid
                }
            },
            role:{
               connect:{
                   id:args.data.role
               }
            }
        }
    }, info)
}



 async function deleteUserRole(parent, args, { prisma, request }, info) {
    const RoleMemberExists = await prisma.exists.RoleMember({
        id: args.id
        
    })
    if (!RoleMember) {
        throw new Error('Unable to delete RoleMember')
    }    
    return prisma.mutation.deleteRoleMember({
        where: {
            id: args.id
        }
    }, info)
}
async function updateUserRole(parent, args, { prisma, request }, info) {
    const RoleMemberExists = await prisma.exists.RoleMember({
        id: args.id
        
    })
    if (!RoleMemberExists) {
        throw new Error('Unable to update RoleMember')
    }    
   return prisma.mutation.updateRoleMember({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}




export {createUserRole,deleteUserRole,updateUserRole}
