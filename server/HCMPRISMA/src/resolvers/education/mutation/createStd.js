export default function createStd(parent, args, { prisma, request }, info) {
    console.log("Recieved requeest", JSON.stringify(args))
    return prisma.mutation.createStd({
        data: {
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
            },
            board:{
                connect:{
                    id:args.data.board
                }
            }
        }
    }, info)
}
