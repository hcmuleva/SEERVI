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
 
  

export {createSubjectSubscription}
 