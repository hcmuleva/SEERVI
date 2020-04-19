async function getAllSubjects(parent, args, { prisma ,request}, info) {
    const subjects = await prisma.query.subjects(null, info)

    return subjects
}

async function getSubjectById(parent, args, { prisma ,request}, info) {
    return await prisma.query.subject( {
      where:  { id: args.id } 
    }, info)
}

async function getSubjectByStd(parent, args, { prisma ,request}, info) {
    return await prisma.query.subjects( {
      where: { std: { id: args.id } }
    }, info)
}

async function getSubgroupSubjects(parent, args, { prisma ,request}, info) {
    return await prisma.query.subjects( {
      where: { subgroup: { id: args.id } }
    }, info)
}

export  {getAllSubjects,getSubjectById,getSubjectByStd,getSubgroupSubjects}