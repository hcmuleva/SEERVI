async function getAllSubjects(parent, args, { prisma ,request}, info) {
    const subjects = await prisma.query.subjects(null, info)

    return subjects
}

export  {getAllSubjects}