async function createProfile(parent, args, { prisma, request }, info) {
  const createdProfile = await prisma.mutation.createProfile(
    {
      data: {
        name: args.data.name,
        userId: { connect: { id: args.data.userId } }
      }
    },
    info
  );
  return createdProfile;
}
async function createEducationProfile(parent, args, { prisma, request }, info) {
  const createdStudentProfile = await prisma.mutation.createStudentProfile(
    {
      data: {
        name: args.data.name,
        profiileType: args.data.profiileType,
        educationLevel: args.data.educationLevel,
        educationType: args.data.educationType,
        specialization: args.data.specialization,
        std: args.data.std,
        startedYear: args.data.startedYear,
        completedYear: args.data.completedYear,
        result: args.data.result,
        status: args.data.status,
        remark: args.data.remark,
        profileId: { connect: { id: args.data.profileId } }
      }
    },
    info
  );
  return createdStudentProfile;
}

async function createPersonalProfile(parent, args, { prisma, request }, info) {
  return await prisma.mutation.createPersonalProfile(
    {
      data: {
        name: args.data.name,
        avatar: args.data.avatar,
        mobile: args.data.mobile,
        isMobilePublished: args.data.isMobilePublished,
        profileId: { connect: { id: args.data.profileId } }
      }
    },
    info
  );
}
async function createAddress(parent, args, { prisma, request }, info) {
  return await prisma.mutation.createAddress(
    {
      data: {
        adressline: args.data.adressline,
        tehsil: args.data.tehsil,
        city: args.data.city,
        district: args.data.district,
        state: args.data.state,
        pincode: args.data.pincode,
        personalProfile: { connect: { id: args.data.personalProfile } }
      }
    },
    info
  );
}

export {
  createProfile,
  createEducationProfile,
  createPersonalProfile,
  createAddress
};
