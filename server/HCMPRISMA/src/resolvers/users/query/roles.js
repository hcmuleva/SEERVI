function roles(parent, args, { prisma }, info) {
    return prisma.query.roles(null, info)
}
async function getUserRoles(parent, args, { prisma }, info) {
 const myspecificGroup = await prisma.query.roles()
 const singleElm=myspecificGroup.filter((item)=>{return item.rolename==='STUDENT'})
 console.log("myspecificGroup",singleElm)

 const allRoles = await prisma.query.userRoles({
    where: {
        group: {
            id: args.groupid
        },
        user:{
            id:args.userid
        }
    }
    
}, info)
if(!allRoles&& allRoles.length<=0){
    return new Error("No Roles for given user in a given group")
}
return allRoles;
}
export   {roles,getUserRoles}