export default function createSpecialization(parent, args, { prisma, request }, info) {
    console.log("Recieved requeest", JSON.stringify(args))
    return prisma.mutation.createSpecialization({
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
            },
            std:{
                connect:{
                    id:args.data.std
                }
            }
        }
    }, info)
}
