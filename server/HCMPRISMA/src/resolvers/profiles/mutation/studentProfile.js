
async function createProfile(parent,args,{prisma,request},info){
     const createdProfile=await prisma.mutation.createProfile({
        data: {
            name:args.data.name,
            userId:{connect:{id:args.data.userId}}
        }
    }, info)
    return createdProfile;
}
async function createStudentProfile(parent,args,{prisma,request},info){
     const createdStudentProfile=await prisma.mutation.createStudentProfile({
        data: {

            name:args.data.name,
            profiileType:args.data.profiileType,
            educationLevel:args.data.educationLevel,
            educationType:args.data.educationType,
            specialization:args.data.specialization,
            std:args.data.std,
            startedYear:args.data.startedYear,
            completedYear:args.data.completedYear,
            result:args.data.result,
            status:args.data.status,
            remark:args.data.remark,
            profileId:{connect:{id:args.data.profileId}}
        }
    }, info)
    return createdStudentProfile;
}
export {createProfile,createStudentProfile}
