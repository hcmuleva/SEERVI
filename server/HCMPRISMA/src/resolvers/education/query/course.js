async function getAllCourses(parent, args, { prisma, request }, info) {
  const courses = await prisma.query.courses(null, info);

  return courses;
}

async function getCourseById(parent, args, { prisma, request }, info) {
  return await prisma.query.course(
    {
      where: { id: args.id },
    },
    info
  );
}

async function getCourseByStd(parent, args, { prisma, request }, info) {
  return await prisma.query.courses(
    {
      where: { std: { id: args.id } },
    },
    info
  );
}

async function getSubgroupCourses(parent, args, { prisma, request }, info) {
  return await prisma.query.courses(
    {
      where: { subgroup: { id: args.id } },
    },
    info
  );
}

export { getAllCourses, getCourseById, getCourseByStd, getSubgroupCourses };
