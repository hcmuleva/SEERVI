
export default function createGroup(parent, args, { prisma, request }, info) {
    return prisma.mutation.createGroup({
        data: {
            name: args.data.name
        }
    }, info)
}
