import getUserId from '../../../utils/getUserId'

async function createSubjectSubscription(parent,args,{prisma,request},info){
    console.log("REquest ",args)
     const createdSubjectSubscription=await prisma.mutation.createSubjectSubscription({
        data: {
            subsType:args.data.subsType,    
            subscribedAs:{connect:{id:args.data.subscribedAs}},
            mySubjects:{connect:{id:args.data.mySubject}},
            userid:{connect:{id:args.data.userid}}
        }
    }, info)
    return createdSubjectSubscription;
}
 

 async function createSubject(parent,args,{prisma,request},info){
    console.log("REquest ",args)
    const userId = getUserId(request)
 

     const createdSubject=await prisma.mutation.createSubject({data: {
        name:args.data.name,
        std:{connect:{id:args.data.std}},
        board:args.data.board,
        category:args.data.category,
        medium:{connect:{id:args.data.medium}},     
        group:{connect:{id:args.data.group}},       
        subgroup:{connect:{id:args.data.subgroup}},
        createdBy:{connect:{id:userId}}  ,
        plantDate:args.data.plantDate,
        isPublished:args.data.isPublished ,
        state:args.data.state,
        status:args.data.status,
        available:args.data.available,
        description:args.data.description
            }}, info)
    return createdSubject;
}


async function updateSubject(parent, args, { prisma, request }, info) {
   const subjectExists = await prisma.exists.Subject({ id: args.data.id})
    if (!subjectExists) {
        throw new Error('Unable to update subject')
    } 
    return await prisma.mutation.updateSubject({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
  
}
async function deleteSubject(parent, args, { prisma, request }, info) {
   const subjectExists = await prisma.exists.Subject({ id: args.id})
    if (!subjectExists) {
        throw new Error('Unable to Delete Subject')
    } 
    return await prisma.mutation.deleteSubject({
        where: {
            id: args.id
        }
        
    }, info)
  
}
export {createSubjectSubscription,createSubject,updateSubject,deleteSubject}
 