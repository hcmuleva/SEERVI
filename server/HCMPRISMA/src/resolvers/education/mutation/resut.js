 import getUserId from '../../../utils/getUserId'

 async function createResult(parent, args, { prisma, request }, info) {
     const data=args.data
     let myque=[]
     data.questions.map((elm)=>{
         myque.push(elm)
     })
     data['questions']={connect:myque}
     console.log("DATA ",JSON.stringify(data))
     if(data.quiz){data['quiz']={connect:{id:data.quiz}}}
     if(data.attempted){data['attempted']={connect:{id:data.attempted}}}
     if(data.notattempted){data['notattempted']={connect:{id:data.notattempted}}}
     if(data.correct){data['correct']={connect:{id:data.correct}}}
     if(data.wrong){data['wrong']={connect:{id:data.wrong}}}
      
    const userId = getUserId(request)
    
     data['userId']={connect:{id:userId}}
    
    return await prisma.mutation.createResult({
         data
         }, info)
}
 
async function deleteResult(parent, args, { prisma, request }, info) {
    console.log("DELETE Content Request",args)
    const isExists = await prisma.exists.Result({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete Result')
    }    
    return prisma.mutation.deleteResult({
        where: {
            id: args.id
        }
    }, info)
}
async function updateResult(parent, args, { prisma, request }, info) {
    console.log("Update Result Request ", args)
    const userId = getUserId(request)

    const isExists = await prisma.exists.Result({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable toupdateResult')
    } 
    const data=args.data
    
    if(data.questions){ let myque=[]
     data.questions.map((elm)=>{
         myque.push(elm)
     }) data['questions']={connect:myque}}   
    if(data.quiz){data['quiz']={connect:{id:data.quiz}}}
    if(data.attempted){data['attempted']={connect:{id:data.attempted}}}
    if(data.notattempted){data['notattempted']={connect:{id:data.notattempted}}}
    if(data.correct){data['correct']={connect:{id:data.correct}}}
    if(data.wrong){data['wrong']={connect:{id:data.wrong}}}

   return prisma.mutation.updateResult({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
}
export {createResult,updateResult,deleteResult}