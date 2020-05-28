async function getAllExam(parent, args, { prisma }, info) {
  return await prisma.query.exams(null, info);
}
async function getSingleExam(parent, args, { prisma }, info) {
  return await prisma.query.exam(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
}
export { getAllExam, getSingleExam };
