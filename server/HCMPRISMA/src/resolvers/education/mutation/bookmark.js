import getUserId from "../../../utils/getUserId";

async function createBookmark(parent, args, { prisma, request }, info) {
  const userId = getUserId(request);
  let data = args.data;

  data["createdBy"] = { connect: { id: userId } };
  if (data.subject) {
    data["subject"] = { connect: { id: args.data.subject } };
  }
  if (data.unit) {
    data["unit"] = { connect: { id: args.data.unit } };
  }
  if (data.topic) {
    data["topic"] = { connect: { id: args.data.topic } };
  }

  console.log("data for createExample ", data);
  return await prisma.mutation.createBookmark(
    {
      data,
    },
    info
  );
}

async function deleteBookmark(parent, args, { prisma, request }, info) {
  console.log("DELETE Bookmark Request", args);
  const isExists = await prisma.exists.Bookmark({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable to delete Bookmark");
  }
  return prisma.mutation.deleteBookmark(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}
async function updateBookmark(parent, args, { prisma, request }, info) {
  console.log("Update Std Request ", args);

  const isExists = await prisma.exists.Bookmark({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable toupdateBookmark");
  }
  if (args.data["subject"]) {
    args.data["subject"] = { connect: { id: args.data["subject"] } };
  }
  if (args.data["unit"]) {
    args.data["unit"] = { connect: { id: args.data["unit"] } };
  }
  if (args.data["topic"]) {
    args.data["topic"] = { connect: { id: args.data["topic"] } };
  }

  return prisma.mutation.updateBookmark(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}
export { createBookmark, deleteBookmark, updateBookmark };
