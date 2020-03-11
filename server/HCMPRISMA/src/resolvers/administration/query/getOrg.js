async function allorgs(parent, args, { prisma }, info) {
    console.log("all Orgs get called")
    const myorgs= await prisma.query.organizations(null, info)
    console.log("myorgs",myorgs)
    return myorgs;
}

function orgById(parent, args, { prisma }, info) {
    console.log("REQIEST FOR ORGBYIID Invoked for ",args)
   return prisma.query.organization({
         where :{
            id:args.id
         }
    }, info)
}
function orgByname(parent, args, { prisma }, info) {
    return prisma.query.organizations(args.data, info)
}
export {allorgs,orgById,orgByname}