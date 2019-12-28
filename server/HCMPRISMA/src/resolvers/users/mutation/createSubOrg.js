
export default function createSubOrg(parent, args, { prisma, request }, info) {

    return prisma.mutation.createSubOrg({
        data: {
            name: args.data.name,
            org:{
                connect: {
                    id: args.data.org,
                }
            }
        }
    }, info)
}
