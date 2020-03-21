 import getUserId from '../../../utils/getUserId'

 async function createContent(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    console.log("createContent ARGS DATA",args)
    let data={}
     const {subject,name,number,plantDate,isPublished,state,status,available,unit,topic,type,fileInfo}=args.data
     const createdBy={connect:{id:userId}}
     const subjectVal ={connect:{id:subject}}
     let unitVal
     let topicVal
     if(unit){
         unitVal={connect:{id:unit}}
     }
     if(topic){
           topicVal={connect:{id:topic}}
     }
     data ={subject:subjectVal,name,number,plantDate,isPublished,state,status,available,unit:unitVal,topic:topicVal,type,fileInfo}
    
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