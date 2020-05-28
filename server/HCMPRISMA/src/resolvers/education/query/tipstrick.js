async function getAllTipsTricks(parent, args, { prisma }, info) {
  return await prisma.query.tipsTricks(null, info);
}
export { getAllTipsTricks };
