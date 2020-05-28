async function createCourse(parent, args, { prisma, request }, info) {
  return await prisma.mutation.createCourse({ data: args.data }, info);
}

async function updateCourse(parent, args, { prisma, request }, info) {
  const exists = await prisma.exists.Course({ id: args.data.id });
  if (!exists) {
    throw new Error("Unable to update Course, already exist");
  }
  return await prisma.mutation.updateCourse(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}
async function deleteCourse(parent, args, { prisma, request }, info) {
  const exists = await prisma.exists.Course({ id: args.id });
  if (!exists) {
    throw new Error("Unable to deleteCourse");
  }
  return await prisma.mutation.deleteCourse(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

export { createCourse, updateCourse, deleteCourse };
