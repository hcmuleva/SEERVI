async function createGroup(parent,args,{prisma,request},info){
    console.log("REquest ",args)
     return await prisma.mutation.createGroup({
        data: {
            name:args.data.name,    
            description:args.data.description,
            suborgid: {
                connect:{
                    id:args.data.suborgid
                }
            }
        }
    }, info)
   
}
 
 async function deleteGroup(parent,args,{prisma,request},info){
    const groupExists = await prisma.exists.Group({
        id: args.id
        
    })
    if (!groupExists) {
        throw new Error('Unable to DELETE Group')
    }  
     return await prisma.mutation.deleteGroup({
        where: {
            id:args.id,    
            
        }
    }, info)
   
}



 async function updateGroup(parent,args,{prisma,request},info){
     const groupExists = await prisma.exists.Group({
        id: args.id
        
    })
    if (!groupExists) {
        throw new Error('Unable to update Group')
    }  
     return await prisma.mutation.updateGroup({
        where: {id:args.id},
        data: args.data
    }, info)
   
}
export {createGroup,updateGroup,deleteGroup}