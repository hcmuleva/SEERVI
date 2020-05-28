import getUserId from "../../../utils/getUserId";

async function createFormula(parent, args, { prisma, request }, info) {
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
  return await prisma.mutation.createFormula(
    {
      data,
    },
    info
  );
}

async function deleteFormula(parent, args, { prisma, request }, info) {
  console.log("DELETE Formula Request", args);
  const isExists = await prisma.exists.Formula({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable to delete Formula");
  }
  return prisma.mutation.deleteFormula(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}
async function updateFormula(parent, args, { prisma, request }, info) {
  console.log("Update Std Request ", args);

  const isExists = await prisma.exists.Formula({
    id: args.id,
  });
  if (!isExists) {
    throw new Error("Unable toupdateFormula");
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

  return prisma.mutation.updateFormula(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}
export { createFormula, deleteFormula, updateFormula };
