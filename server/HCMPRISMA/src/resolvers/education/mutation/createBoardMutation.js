export default function createBoard(parent, args, { prisma, request }, info) {
    console.log("Recieved requeest", JSON.stringify(args))
    return prisma.mutation.createBoard({
        data: {
            published: args.data.published,
            name: args.data.name,
            org: {
                connect: {
                    id: args.data.org
                }
            },
            subOrg: {
                connect: {
                    id: args.data.subOrg
                }
            }
        }
    }, info)
}
