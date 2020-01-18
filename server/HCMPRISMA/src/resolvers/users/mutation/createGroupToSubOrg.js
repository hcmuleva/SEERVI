
 function createGroupsToSubOrg(parent, args, { prisma, request }, info) {

    return prisma.mutation.createSubOrgGroup({
        data: {
            suborg:{
                connect: {
                    id: args.data.suborg,
                }
            },
            group:{
                connect: {
                    id: args.data.group,
                }
            }
            
        }
    }, info)
}


export {createGroupsToSubOrg}