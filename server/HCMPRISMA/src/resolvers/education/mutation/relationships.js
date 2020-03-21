async function createEducationRelationship(parent, args, { prisma, request }, info) {
    let data={description:args.data.description}
    if(args.data.teacher) {
        data["teacher"]={connect:{ id:args.data.teacher}}
    }
    if(args.data.parent) {
        data["parent"]={connect:{ id:args.data.parent}}
    }
    if(args.data.student) {
        data["student"]={connect:{ id:args.data.student}}
    }
    console.log("DATA ",data)
    return await prisma.mutation.createEducationRelationship(
    {data:data},
    info
  );
}
async function deleteEducationRelationship(parent, args, { prisma, request }, info) {
    const isExists = await prisma.exists.EducationRelationship({
        id: args.id
        
    })
    if (!isExists) {
        throw new Error('Unable to delete EducationRelationship')
    }    
    return prisma.mutation.deleteEducationRelationship({
        where: {
            id: args.id
        }
    }, info)
}
export {createEducationRelationship,deleteEducationRelationship}