 import getUserId from '../../../utils/getUserId'

 async function createContent(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    let data=args.data
   
     data['createdBy']={connect:{id:userId}}
     if(data.subject){
         data['subject']={connect:{id:args.data.subject}}
     }
      if(data.unit){
         data['unit']={connect:{id:args.data.unit}}
     }
      if(data.topic){
         data['topic']={connect:{id:args.data.topic}}
     }
     
    console.log("data for createContent ", data)
    return await prisma.mutation.createContent({
        data
        }, info)
}
 
async function deleteContent(parent, args, { prisma, request }, info) {
    console.log("DELETE Content Request",args)
    const isExists = await prisma.exists.Content({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete Content')
    }    
    return prisma.mutation.deleteContent({
        where: {
            id: args.id
        }
    }, info)
}
async function updateContent(parent, args, { prisma, request }, info) {
    console.log("Update Std Request ", args)
    const userId = getUserId(request)

    const isExists = await prisma.exists.Content({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable toupdateContent')
    }    
    args.data["updateBy"]={connect:{id:userId}}
    if(args.data["subject"]){args.data["subject"]={connect:{id:args.data["subject"]}}}
    if(args.data["unit"]){args.data["unit"]={connect:{id:args.data["unit"]}}}
    if(args.data["topic"]){args.data["topic"]={connect:{id:args.data["topic"]}}}

   return prisma.mutation.updateContent({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createContent,deleteContent,updateContent}