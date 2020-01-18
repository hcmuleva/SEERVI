
export default function createSubGroup(parent, args, { prisma, request }, info) {
    return prisma.mutation.createSubGroup({
        data: {
            name: args.data.name,
            group:{
                connect: {
                    id: args.data.group,
                }
            }
        }
    }, info)
}
