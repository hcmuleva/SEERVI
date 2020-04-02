import getUserId from '../../../utils/getUserId'

 async function createSubject(parent,args,{prisma,request},info){
    console.log("REquest ",args)
    const userId = getUserId(request)
 
     const {name,std,board,picture,category,medium,group,subgroup,createdBy,plantDate,isPublished,state,status,available,description}=args.data
     const createdSubject=await prisma.mutation.createSubject({data: {
        name,
        std:{connect:{id:std}},
        board,
        picture:picture,
        category,
        medium:{connect:{id:medium}},     
        group:{connect:{id:group}},       
        subgroup:{connect:{id:subgroup}},
        createdBy:{connect:{id:userId}}  ,
        plantDate,
        isPublished,
        state,
        status,
        available,
        description
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

export {createSubject,updateSubject,deleteSubject}