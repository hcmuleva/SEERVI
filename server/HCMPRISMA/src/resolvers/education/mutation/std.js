async function createStd(parent, args, { prisma, request }, info) {
  console.log("REQUEST for std creation ", args.data);
  const {
    gradename,
    branch,
    year,
    category,
    isPublished,
    semester,
    specilize
  } = args.data;
  console.log("GRADENAME ", gradename);
  return await prisma.mutation.createStd(
    { gradename, branch, year, category, isPublished, semester, specilize },
    info
  );
}

async function deleteStd(parent, args, { prisma, request }, info) {
  console.log("DELETE Std Request", args);
  const stdExists = await prisma.exists.Std({
    id: args.id
  });
  if (!stdExists) {
    throw new Error("Unable to delete Std");
  }
  return prisma.mutation.deleteStd(
    {
      where: {
        id: args.id
      }
    },
    info
  );
}
async function updateStd(parent, args, { prisma, request }, info) {
  console.log("Update Std Request ", args);
  const stdExists = await prisma.exists.Std({
    id: args.id
  });
  if (!stdExists) {
    throw new Error("Unable to update std");
  }
  return prisma.mutation.updateStd(
    {
      where: {
        id: args.id
      },
      data: args.data
    },
    info
  );
}
export { createStd, deleteStd, updateStd };
