async function createSubOrg(parent,args,{prisma,request},info){
    console.log("RECIEVED CREATED SUBORG REQUEST",args.data)
     return await prisma.mutation.createSuborg({
        data: {
            name:args.data.name,    
            description:args.data.description,
            org: {
                connect:{
                    id:args.data.orgid
                }
            }
        }
    }, info)
}
 
 async function deleteSubOrg(parent, args, { prisma, request }, info) {
    const suborgExists = await prisma.exists.Suborg({
        id: args.id
        
    })
    if (!suborgExists) {
        throw new Error('Unable to delete SubOrg')
    }    
    return prisma.mutation.deleteSuborg({
        where: {
            id: args.id
        }
    }, info)
}
async function updateSuborg(parent, args, { prisma, request }, info) {
    const suborgExists = await prisma.exists.Suborg({
        id: args.id
        
    })
    if (!suborgExists) {
        throw new Error('Unable to update Suborg')
    }    
   return prisma.mutation.updateSuborg({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
 
export {createSubOrg,deleteSubOrg,updateSuborg}