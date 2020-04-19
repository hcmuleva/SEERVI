
async function createMedium(params,args, { prisma }, info) {
    let data =args.data
     if(data.subgroup){
         data['subgroup']={connect:{id:data.subgroup}}
     }
    return await prisma.mutation.createMedium({
         data
         }, info)
}
async function updateMedium(params,args, { prisma }, info) {
    const mediumExists = await prisma.exists.Medium({ id: args.data.id})
    if (!mediumExists) {
        throw new Error('Unable to update Meddium')
    } 
    return await prisma.mutation.updateMedium({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
   
}


 
async function deleteMedium(params,args, { prisma }, info) {
       const mediumExists = await prisma.exists.Medium({ id: args.data.id})
    if (!mediumExists) {
        throw new Error('Unable to update Meddium')
    } 
    return await prisma.mutation.deleteMedium({
        where: {
            id: args.id
        }
    }, info)
}
export {createMedium,updateMedium,deleteMedium}