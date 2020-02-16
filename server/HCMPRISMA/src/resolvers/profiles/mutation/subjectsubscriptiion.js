async function createSubjectSubscription(parent,args,{prisma,request},info){
    console.log("REquest ",args)
     const createdSubjectSubscription=await prisma.mutation.createSubjectSubscription({
        data: {
            subsType:args.data.subsType,    
            subscribedAs:args.data.subscribedAs,
            mySubjects:{connect:{id:args.data.mySubject}},
            userid:{connect:{id:args.data.userid}}
        }
    }, info)
    return createdSubjectSubscription;
}
 

 async function createSubject(parent,args,{prisma,request},info){
    console.log("REquest ",args)
      
     const createdSubject=await prisma.mutation.createSubject({
        data: {
            name:args.data.name,
            std:args.data.std,
            medium:{connect:{id:args.data.medium}},     
            board:args.data.board,
            group:{connect:{id:args.data.group}},       
            subgroup:{connect:{id:args.data.subgroup}}   
        }
    }, info)
    return createdSubject;
}
export {createSubjectSubscription,createSubject}
 