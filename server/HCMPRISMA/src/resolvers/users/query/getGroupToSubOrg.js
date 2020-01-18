
async function suborgToGroup(parent, args, { prisma }, info) {
 const orgid=args.query
 const allSuborgsData = await prisma.query.subOrgGroups({
    where: {
        suborg: {id:args.query}
    }
}, info)

console.log("allSuborgsData",allSuborgsData)

return allSuborgsData
}


export default  suborgToGroup

