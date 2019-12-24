
export default function createOrganization(parent, args, { prisma, request }, info) {

    return prisma.mutation.createOrganization({
        data: {
            name: args.data.name,
            description:args.data.description
        }
    }, info)
}
