async function createSubGroup(parent,args,{prisma,request},info){
     const createdSubGroup=await prisma.mutation.createSubGroup({
        data: {
            name:args.data.name,    
            description:args.data.description,
            groupid: {
                connect:{
                    id:args.data.groupid
                }
            }
        }
    }, info)
    return createdSubGroup;
}
 
 async function deleteSubGroup(parent,args,{prisma,request},info){
    const subgroupExists = await prisma.exists.SubGroup({
        id: args.id   
    })
    if (!subgroupExists) {
        throw new Error('Unable to DELETE SubGroup')
    }  
     return await prisma.mutation.deleteSubGroup({
        where: {
            id:args.id,    
            
        }
    }, info)
   
}
 async function updateSubGroup(parent,args,{prisma,request},info){
     const subgroupExists = await prisma.exists.SubGroup({
        id: args.id
        
    })
    if (!subgroupExists) {
        throw new Error('Unable to update SubGroup')
    }  
     return await prisma.mutation.updateSubGroup({
        where: {id:args.id},
        data: args.data
    }, info)
   
}
export {createSubGroup,deleteSubGroup,updateSubGroup}