async function getAllOrganization(parent, args, { prisma }, info) {
  return await prisma.query.organizations(null, info);
}

function getOrganizationById(parent, args, { prisma }, info) {
  return prisma.query.organization(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}

export { getAllOrganization, getOrganizationById };
