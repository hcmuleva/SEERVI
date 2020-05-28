import getUserId from "../../../utils/getUserId";

async function createNote(parent, args, { prisma, request }, info) {
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
  return await prisma.mutation.createNote(
    {
      data,
    },
    info
  );
}

async function deleteNote(parent, args, { prisma, request }, info) {
  console.log("DELETE Note Request", args);
  const isExists = await prisma.exists.Note({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable to delete Note");
  }
  return prisma.mutation.deleteNote(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}
async function updateNote(parent, args, { prisma, request }, info) {
  console.log("Update Note Request ", args);

  const isExists = await prisma.exists.Note({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable toupdateNote");
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

  return prisma.mutation.updateNote(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}
export { createNote, deleteNote, updateNote };
