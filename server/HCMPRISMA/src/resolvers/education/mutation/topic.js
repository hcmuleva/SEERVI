 import getUserId from '../../../utils/getUserId'

 async function createTopic(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    console.log("createdBy ",userId)
    console.log("ARGS DATA",args)
    
     const {subject,name,plantDate,isPublished,state,status,available,unit}=args.data
     const createdBy={connect:{id:userId}}
     const subjectVal ={connect:{id:subject}}
     let unitValue;
     if(unit){
         unitValue={connect:{id:unit}}
     }
     let data={name,subject:subjectVal,plantDate,isPublished,state,status,available,unit:unitValue}
     console.log("111sdata for createTopic ", data)
    return await prisma.mutation.createTopic({data}, info)
}
 
async function deleteTopic(parent, args, { prisma, request }, info) {
    console.log("DELETE Topic Request",args)
    const isExists = await prisma.exists.Topic({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete Topic')
    }    
    return prisma.mutation.deleteTopic({
        where: {
            id: args.id
        }
    }, info)
}
async function updateTopic(parent, args, { prisma, request }, info) {
    console.log("Update Std Request ", args)
    const userId = getUserId(request)

    const isExists = await prisma.exists.Topic({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable toupdateTopic')
    }    
    args.data["updateBy"]={connect:{id:userId}}
    if(args.data["subject"]){args.data["subject"]={connect:{id:args.data["subject"]}}}
    if(args.data["unit"]){args.data["unit"]={connect:{id:args.data["unit"]}}}
   return prisma.mutation.updateTopic({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createTopic,deleteTopic,updateTopic}