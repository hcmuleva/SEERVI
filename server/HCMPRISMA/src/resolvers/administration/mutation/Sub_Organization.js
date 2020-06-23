import { orgwithoutnameException } from "../../../exceptions/administrationException";
import hashPassword from "../../../utils/hashPassword";
function createSubOrganization(parent, args, { prisma, request }, info) {
  if (!args.data.sub_organization_name) {
    throw new orgwithoutnameException();
  }
  let argData = { ...args.data };
  argData["organization"] = {
    connect: {
      id: args.data.organization,
    },
  };
  return prisma.mutation.createSub_Organization(
    {
      data: argData,
    },
    info
  );
}
async function deleteSubOrganization(parent, args, { prisma, request }, info) {
  const SuborgExists = await prisma.exists.Sub_Organization({
    id: args.id,
  });
  if (!SuborgExists) {
    throw new Error("Unable to delete SubOrganization");
  }
  return prisma.mutation.deleteSub_Organization(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

async function updateSubOrganization(parent, args, { prisma, request }, info) {
  console.log("Recieved Args ", args);
  const SuborgExists = await prisma.exists.Sub_Organization({
    id: args.id,
  });
  if (!SuborgExists) {
    throw new Error("Unable to update SubOrganization");
  }
  return prisma.mutation.updateSub_Organization(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}

export { createSubOrganization, deleteSubOrganization, updateSubOrganization };
