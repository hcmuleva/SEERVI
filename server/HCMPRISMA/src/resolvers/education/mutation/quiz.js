 import getUserId from '../../../utils/getUserId'

 async function createQuiz(parent, args, { prisma, request }, info) {
     const data=args.data
     let myque=[]
     data.questions.map((elm)=>{
         myque.push(elm)
     })
     data['questions']={connect:myque}
     console.log("DATA ",JSON.stringify(data))
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
    
    return await prisma.mutation.createQuiz({
         data
         }, info)
}
 
async function deleteQuiz(parent, args, { prisma, request }, info) {
    console.log("DELETE Content Request",args)
    const isExists = await prisma.exists.Quiz({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete Quiz')
    }    
    return prisma.mutation.deleteQuiz({
        where: {
            id: args.id
        }
    }, info)
}
async function updateQuiz(parent, args, { prisma, request }, info) {
    console.log("Update Quiz Request ", args)
    const userId = getUserId(request)

    const isExists = await prisma.exists.Quiz({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable toupdateQuiz')
    }    
    if(args.data["subject"]){args.data["subject"]={connect:{id:args.data["subject"]}}}
    if(args.data["unit"]){args.data["unit"]={connect:{id:args.data["unit"]}}}
    if(args.data["topic"]){args.data["topic"]={connect:{id:args.data["topic"]}}}

   return prisma.mutation.updateQuiz({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createQuiz,updateQuiz,deleteQuiz}