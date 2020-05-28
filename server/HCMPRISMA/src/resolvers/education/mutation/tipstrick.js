import getUserId from "../../../utils/getUserId";

async function createTipsTrick(parent, args, { prisma, request }, info) {
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
  return await prisma.mutation.createTipsTrick(
    {
      data,
    },
    info
  );
}

async function deleteTipsTrick(parent, args, { prisma, request }, info) {
  console.log("DELETE TipsTrick Request", args);
  const isExists = await prisma.exists.TipsTrick({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable to delete TipsTrick");
  }
  return prisma.mutation.deleteTipsTrick(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}
async function updateTipsTrick(parent, args, { prisma, request }, info) {
  console.log("Update Std Request ", args);

  const isExists = await prisma.exists.TipsTrick({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable toupdateTipsTrick");
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

  return prisma.mutation.updateTipsTrick(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}
export { createTipsTrick, deleteTipsTrick, updateTipsTrick };
