async function getAllGroup(parent, args, { prisma }, info) {
  return await prisma.query.groups(null, info);
}

function getGroupById(parent, args, { prisma }, info) {
  return prisma.query.group(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

export { getAllGroup, getGroupById };
