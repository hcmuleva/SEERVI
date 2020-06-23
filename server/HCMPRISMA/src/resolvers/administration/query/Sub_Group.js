async function getAllSub_Group(parent, args, { prisma }, info) {
  return await prisma.query.sub_Groups(null, info);
}

function getSub_GroupById(parent, args, { prisma }, info) {
  return prisma.query.sub_Group(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

export { getAllSub_Group, getSub_GroupById };
