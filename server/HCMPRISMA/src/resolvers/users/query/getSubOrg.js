function allsuborgs(parent, args, { prisma }, info) {

    return prisma.query.suborgs(null, info)
}



async function suborgsoforg(parent, args, { prisma }, info) {
console.log("getAllSubOrgOfOrg args",args.id,"parent",parent)
const allSuborgs= await prisma.query.suborgs({
    where :{
        org:{connect:{id:args.id}}
    }
   
    
    
}, info)

return allSuborgs
}

export  {allsuborgs,suborgsoforg}
