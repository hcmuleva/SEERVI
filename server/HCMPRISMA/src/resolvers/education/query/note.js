async function getAllNotes(parent, args, { prisma }, info) {
  return await prisma.query.notes(null, info);
}
export { getAllNotes };
