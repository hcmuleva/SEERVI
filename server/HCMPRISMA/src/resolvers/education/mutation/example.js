
 async function createExample(parent, args, { prisma, request }, info) {
    let data={}
     const {subject,name,plantDate,isPublished,state,status,available}=args.data
     data["subject"]={connect:{id:subject}}
     data["unit"]={connect:{id:unit}}
     data["topic"]={connect:{id:topic}}
     data["name"]=name
     data["level"]=level
    console.log("data for createExample ", data)
    return await prisma.mutation.createExample({
        data
        }, info)
}
 
async function deleteExample(parent, args, { prisma, request }, info) {
    console.log("DELETE Example Request",args)
    const isExists = await prisma.exists.Example({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete Example')
    }    
    return prisma.mutation.deleteExample({
        where: {
            id: args.id
        }
    }, info)
}
async function updateExample(parent, args, { prisma, request }, info) {
    console.log("Update Std Request ", args)
    const userId = getUserId(request)

    const isExists = await prisma.exists.Example({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable toupdateExample')
    }    
    args.data["updateBy"]={connect:{id:userId}}
    if(args.data["subject"]){args.data["subject"]={connect:{id:args.data["subject"]}}}
   return prisma.mutation.updateExample({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createExample,deleteExample,updateExample}