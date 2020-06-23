import { orgwithoutnameException } from "../../../exceptions/administrationException";
import hashPassword from "../../../utils/hashPassword";
function createGroup(parent, args, { prisma, request }, info) {
  if (!args.data.group_name) {
    throw new Error("Group Name is required");
  }
  let argData = { ...args.data };
  argData["sub_organization"] = {
    connect: {
      id: args.data.sub_organization,
    },
  };
  return prisma.mutation.createGroup(
    {
      data: argData,
    },
    info
  );
}
async function deleteGroup(parent, args, { prisma, request }, info) {
  const GroupExists = await prisma.exists.Group({
    id: args.id,
  });
  if (!GroupExists) {
    throw new Error("Unable to delete Group");
  }
  return prisma.mutation.deleteGroup(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

async function updateGroup(parent, args, { prisma, request }, info) {
  const GroupExists = await prisma.exists.Group({
    id: args.id,
  });
  if (!GroupExists) {
    throw new Error("Unable to update Group");
  }
  return prisma.mutation.updateGroup(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}

export { createGroup, deleteGroup, updateGroup };
