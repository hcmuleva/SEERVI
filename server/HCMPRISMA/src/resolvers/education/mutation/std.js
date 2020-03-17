 async function createStd(parent, args, { prisma, request }, info) {
    return await prisma.mutation.createStd({
        stdname:args.data, branch:args.data.branch,year:args.data.year
        }, info)
}
 
async function deleteStd(parent, args, { prisma, request }, info) {
    console.log("DELETE Std Request",args)
    const stdExists = await prisma.exists.Std({
        id: args.id
        
    })
    if (!stdExists) {
        throw new Error('Unable to delete Std')
    }    
    return prisma.mutation.deleteStd({
        where: {
            id: args.id
        }
    }, info)
}
async function updateStd(parent, args, { prisma, request }, info) {
    console.log("Update Std Request ", args)
    const stdExists = await prisma.exists.Std({
        id: args.id
        
    })
    if (!stdExists) {
        throw new Error('Unable to update std')
    }    
   return prisma.mutation.updateStd({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createStd,deleteStd,updateStd}