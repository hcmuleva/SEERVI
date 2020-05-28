async function createUserRole(parent, args, { prisma, request }, info) {
  console.log("RECIEVED CREATED createUserRole REQUEST", args.data);
  const data = args.data;
  if (!data.userid || !data.roleid) {
    throw new Error(
      "Role and User ID are mandatory fields.one of this not provided"
    );
  }
  const userRoleExist = await prisma.exist.UserRole({
    roleid: { id: data.roleid },
    userid: { id: data.userid },
  });
  if (userRoleExist) {
    throw new Error("User already assigned this role");
  }
  data["userid"] = { connect: { id: data.userid } };
  data["roleid"] = { connect: { id: data.roleid } };

  return prisma.mutation.createUserRole(
    {
      data,
    },
    info
  );
}

async function deleteUserRole(parent, args, { prisma, request }, info) {
  const UserRoleExists = await prisma.exists.UserRole({
    id: args.id,
  });
  if (!UserRoleExists) {
    throw new Error("Unable to delete UserRole");
  }
  return prisma.mutation.deleteUserRole(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}
async function updateUserRole(parent, args, { prisma, request }, info) {
  const UserRoleExists = await prisma.exists.UserRole({
    id: args.id,
  });
  if (!UserRoleExists) {
    throw new Error("Unable to update UserRole");
  }
  return prisma.mutation.updateUserRole(
    {
      where: {
        id: args.id,
      },
      data: args.data,
    },
    info
  );
}

export { createUserRole, deleteUserRole, updateUserRole };
