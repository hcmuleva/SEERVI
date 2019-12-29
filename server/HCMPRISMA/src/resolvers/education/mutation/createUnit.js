export default function createUnit(parent, args, { prisma, request }, info) {
    console.log("Recieved requeest", JSON.stringify(args))
    return prisma.mutation.createUnit({
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
            },
            specialization:{
                connect:{
                    id:args.data.specialization
                }
            },
            subject:{
                connect:{
                    id:args.data.subject
                }
            }

        }
    }, info)
}
