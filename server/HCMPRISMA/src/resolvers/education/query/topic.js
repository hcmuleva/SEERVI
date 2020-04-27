async function getAllTopic(parent, args, { prisma }, info) {
  return await prisma.query.topics(null, info);
}

async function getTopicById(parent, args, { prisma, request }, info) {
  return await prisma.query.topic(
    {
      where: { id: args.id },
    },
    info
  );
}

export { getAllTopic, getTopicById };
