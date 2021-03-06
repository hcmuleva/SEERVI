import getUserId from "../../../utils/getUserId";

async function createRole(parent, args, { prisma, request }, info) {
  console.log("ROLE For all", args);
  const data = args.data;
  console.log("userRole", JSON.stringify(data.users));

  if (data.org) {
    const orgRoleExists = await prisma.exists.Role({
      name: data.name,
      org: { id: data.org },
    });
    if (orgRoleExists) {
      throw new Error("Role Already Exist");
    }
    data["org"] = { connect: { id: data.org } };
  }
  if (data.suborg) {
    const suborgRoleExists = await prisma.exists.Role({
      name: data.name,
      suborg: { id: data.suborg },
    });
    if (suborgRoleExists) {
      throw new Error("Role Already Exist");
    }
    data["suborg"] = { connect: { id: data.suborg } };
  }
  if (data.group) {
    const groupRoleExists = await prisma.exists.Role({
      name: data.name,
      group: { id: data.group },
    });
    if (groupRoleExists) {
      throw new Error("Role Already Exist");
    }
    data["group"] = { connect: { id: data.group } };
  }
  if (data.subgroup) {
    const subgroupRoleExists = await prisma.exists.Role({
      name: data.name,
      subgroup: { id: data.subgroup },
    });
    if (subgroupRoleExists) {
      throw new Error("Role Already Exist");
    }
    data["subgroup"] = { connect: { id: data.subgroup } };
  }
  console.log("DATA for role ", data);
  return await prisma.mutation.createRole(
    {
      data,
    },
    info
  );
}

async function updateRoleById(parent, args, { prisma, request }, info) {
  const roleExists = await prisma.exists.Role({ id: args.id });
  if (!roleExists) {
    throw new Error("Unable to update Role");
  }
  return await prisma.mutation.updateRoleById(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}
async function deleteRoleById(parent, args, { prisma, request }, info) {
  const roleExists = await prisma.exists.Role({ id: args.id });
  if (!roleExists) {
    throw new Error("Unable to Delete Role");
  }
  return await prisma.mutation.deleteRoleById(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

export { createRole, updateRoleById, deleteRoleById };
