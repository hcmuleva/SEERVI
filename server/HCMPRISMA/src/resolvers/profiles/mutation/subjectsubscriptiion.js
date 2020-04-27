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
 
  function createSubscriptionBulkSubjects(parent,args,{prisma,request},info){
     console.log("Request recieved ",JSON.stringify(args))
     args.data.mySubjects.map(mySubject=>{
            console.log("mySubject",mySubject)
          prisma.mutation.createSubjectSubscription({
        data: {
            subscribedAs:{connect:{id:args.data.subscribedAs}},
            mySubjects:{connect:{id:mySubject.id}},
            userid:{connect:{id:args.data.userid}}
        }
    })
     })
    
    return true;
}
  

async function deleteSubjectSubscription(parent, args, { prisma, request }, info) {
    const ssExists = await prisma.exists.SubjectSubscription({
        id: args.id,
    })
    if (!ssExists) {
        throw new Error('Unable to delete Subject Subscription')
    }    
    return prisma.mutation.deleteSubjectSubscription({
        where: {
            id: args.id
        }
    }, info)
}

export {createSubjectSubscription,createSubscriptionBulkSubjects,deleteSubjectSubscription}
 