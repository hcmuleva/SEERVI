import { orgwithoutnameException } from "../../../exceptions/administrationException";
import hashPassword from "../../../utils/hashPassword";
function createOrganization(parent, args, { prisma, request }, info) {
  if (!args.data.organization_name) {
    throw new orgwithoutnameException();
  }
  return prisma.mutation.createOrganization(
    {
      data: args.data,
    },
    info
  );
}
async function deleteOrganization(parent, args, { prisma, request }, info) {
  console.log("DELETE ORG Request", args);
  const orgExists = await prisma.exists.Organization({
    id: args.id,
  });
  if (!orgExists) {
    throw new Error("Unable to delete Organization");
  }
  return prisma.mutation.deleteOrganization(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

async function updateOrganization(parent, args, { prisma, request }, info) {
  console.log("Recieved Args ", args);
  const orgExists = await prisma.exists.Organization({
    id: args.id,
  });
  if (!orgExists) {
    throw new Error("Unable to update Organization");
  }
  return prisma.mutation.updateOrganization(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}

export { createOrganization, deleteOrganization, updateOrganization };
