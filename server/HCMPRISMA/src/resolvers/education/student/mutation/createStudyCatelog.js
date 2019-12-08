export default function createStudyCatelog(parent, args, { prisma, request }, info) {
    console.log("CreateCatelog Mutation.js   ARGS::",args)

    return prisma.mutation.createStudyCatelog({
        data: {
            std: args.data.std,
            substd: args.data.substd,
            academic: args.data.academic,
            subacademic: args.data.subacademic,
            subjects: args.data.subjects,
            boards: args.data.boards,
            specialization: args.data.specialization,
            competition: args.data.competition,
            published:args.data.competition,
        }
    }, info)
}