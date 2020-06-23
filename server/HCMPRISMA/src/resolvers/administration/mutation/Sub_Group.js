async function createSub_Group(parent, args, { prisma, request }, info) {
  if (!args.data.sub_group_name) {
    throw new Error("Sub_Group Name is required");
  }
  let argData = { ...args.data };
  argData["group"] = {
    connect: {
      id: args.data.group,
    },
  };
  return prisma.mutation.createSub_Group(
    {
      data: argData,
    },
    info
  );
}
async function deleteSub_Group(parent, args, { prisma, request }, info) {
  const Sub_GroupExists = await prisma.exists.Sub_Group({
    id: args.id,
  });
  if (!Sub_GroupExists) {
    throw new Error("Unable to delete Sub_Group");
  }
  return prisma.mutation.deleteSub_Group(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

async function updateSub_Group(parent, args, { prisma, request }, info) {
  const Sub_GroupExists = await prisma.exists.Sub_Group({
    id: args.id,
  });
  if (!Sub_GroupExists) {
    throw new Error("Unable to update Sub_Group");
  }
  return prisma.mutation.updateSub_Group(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}

export { createSub_Group, deleteSub_Group, updateSub_Group };
