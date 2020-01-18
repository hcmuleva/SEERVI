function groups(parent, args, { prisma }, info) {
    return prisma.query.groups(null, info)
}
async function groupBySubId(parent, args, { prisma }, info) {
    const orgid=args.data.suborg
    console.log("orgid",orgid)
    const mysuborg= prisma.query.subOrg( {
        where: {id:orgid}
    })
    console.log("mysuborg in group",mysuborg, "end")
    const mygroups = await prisma.query.groups( {
        where: {id:mysuborg.group}}
    )
    if(!mygroups&&mygroups.length===0){
        return  new Error("No Group Found")
    }
    return mygroups;

}
export {groups,groupBySubId}