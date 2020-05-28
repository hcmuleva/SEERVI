async function alluserroles(parent, args, { prisma }, info) {
  return await prisma.query.userRoles(null, info);
}

async function userRoleByUserId(parent, args, { prisma }, info) {
  return await prisma.query.userRoles(
    {
      userid: {
        connect: { id: args.userid },
      },
    },
    info
  );
}

export { userRoleByUserId, alluserroles };
