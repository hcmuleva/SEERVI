async function getAllFormulas(parent, args, { prisma }, info) {
  return await prisma.query.formulas(null, info);
}
export { getAllFormulas };
