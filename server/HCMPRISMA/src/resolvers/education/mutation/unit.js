 import getUserId from '../../../utils/getUserId'

 async function createUnit(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    console.log("createdBy ",userId)
    console.log("ARGS DATA",args)
    let data={}
     const {subject,name,plantDate,isPublished,state,status,available}=args.data
     data["createdBy"]={connect:{id:userId}}
     data["subject"]={connect:{id:subject}}
     data["name"]=name
     data["plantDate"]=plantDate
     data["isPublished"]=isPublished
     data["state"]=state
     data["status"]=status
     data["available"]=available
    console.log("data for createUnit ", data)
    return await prisma.mutation.createUnit({
        data
        }, info)
}
 
async function deleteUnit(parent, args, { prisma, request }, info) {
    console.log("DELETE Unit Request",args)
    const isExists = await prisma.exists.Unit({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete Unit')
    }    
    return prisma.mutation.deleteUnit({
        where: {
            id: args.id
        }
    }, info)
}
async function updateUnit(parent, args, { prisma, request }, info) {
    console.log("Update Std Request ", args)
    const userId = getUserId(request)

    const isExists = await prisma.exists.Unit({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable toupdateUnit')
    }    
    args.data["updateBy"]={connect:{id:userId}}
    if(args.data["subject"]){args.data["subject"]={connect:{id:args.data["subject"]}}}
   return prisma.mutation.updateUnit({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createUnit,deleteUnit,updateUnit}