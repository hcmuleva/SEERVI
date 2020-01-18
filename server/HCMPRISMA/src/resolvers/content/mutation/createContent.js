export default function createContent(parent, args, { prisma, request }, info) {
    return prisma.mutation.createContent({
        data: {
            contentType: args.data.contentType,
            medium:args.data.medium,
            level:args.data.level,
            isPublished:args.data.isPublished,
            createdBy: {
                connect: {
                    id: args.data.createdBy
                }
            },
            
        }
        
    }, info)
}
