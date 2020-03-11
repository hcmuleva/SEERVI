import getUserId from '../../../utils/getUserId'
async function getMyProfiles(parent,args,{prisma,request},info){
    return await prisma.query.profiles({
        where: {
            userId: {
                id: args.id
            }
        }
    })
}
async function getAllProfiles(parent, args, { prisma, request }, info) {
    return  await prisma.query.profiles(null, info)
}

async function getStudentProfiles(parent, args, { prisma, request }, info) {
    return  await prisma.query.studentProfiles(null, info)
}

export {getAllProfiles,getStudentProfiles,getMyProfiles}