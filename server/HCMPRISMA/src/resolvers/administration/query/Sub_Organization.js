async function getAllSubOrganization(parent, args, { prisma }, info) {
  return await prisma.query.sub_Organizations(null, info);
}

function getSubOrganizationById(parent, args, { prisma }, info) {
  return prisma.query.sub_Organization(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

export { getAllSubOrganization, getSubOrganizationById };
