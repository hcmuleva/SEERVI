async function getAllBookmarks(parent, args, { prisma }, info) {
  return await prisma.query.bookmarks(null, info);
}
export { getAllBookmarks };
