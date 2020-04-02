 import getUserId from '../../../utils/getUserId'

 async function createQuestion(parent, args, { prisma, request }, info) {
     const data=args.data
     if(data.subject){
         data['subject']={connect:{id:data.subject}}
     }
      if(data.unit){
         data['unit']={connect:{id:data.unit}}
     }
     if(data.topic){
         data['topic']={connect:{id:data.topic}}
     }
    const userId = getUserId(request)
    
     data['createdBy']={connect:{id:userId}}
    return await prisma.mutation.createQuestion({
         data
         }, info)
}
 
async function deleteQuestion(parent, args, { prisma, request }, info) {
    console.log("DELETE Content Request",args)
    const isExists = await prisma.exists.Question({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete Question')
    }    
    return prisma.mutation.deleteQuestion({
        where: {
            id: args.id
        }
    }, info)
}
async function updateQuestion(parent, args, { prisma, request }, info) {
    console.log("Update Question Request ", args)
    const userId = getUserId(request)

    const isExists = await prisma.exists.Question({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable toupdateQuestion')
    }    
    args.data["updatedBy"]={connect:{id:userId}}
    if(args.data["subject"]){args.data["subject"]={connect:{id:args.data["subject"]}}}
    if(args.data["unit"]){args.data["unit"]={connect:{id:args.data["unit"]}}}
    if(args.data["topic"]){args.data["topic"]={connect:{id:args.data["topic"]}}}

   return prisma.mutation.updateQuestion({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createQuestion,updateQuestion,deleteQuestion}