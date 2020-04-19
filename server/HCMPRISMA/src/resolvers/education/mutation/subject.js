import getUserId from '../../../utils/getUserId'

 async function createSubject(parent,args,{prisma,request},info){
    console.log("REquest for createSubject",args)
    let data=args.data
    if(data.std){
        
        data['std']={connect:{id:data.std}}
    }
    if(data.medium){
        data['medium']={connect:{id:data.medium}}
    }
    if(data.group){
        data['group']={connect:{id:data.group}}
    }
    if(data.subgroup){
        data['subgroup']={connect:{id:data.subgroup}}
    }
     return await prisma.mutation.createSubject({data}, info)
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