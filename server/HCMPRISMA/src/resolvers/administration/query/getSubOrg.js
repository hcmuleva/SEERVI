function allsuborgs(parent, args, { prisma }, info) {

    return prisma.query.suborgs(null, info)
}


async function suborgsoforg(parent, args, { prisma }, info) {
console.log("getAllSubOrgOfOrg args",args.id,"parent",parent)
const suborgsData=  await prisma.query.suborgs({
     org:{connect:{id:args.id}} 
}, info)
console.log("suborgsData",suborgsData)

return suborgsData.filter((sorg)=>{
    if(sorg.org.id===args.id) return sorg
});
}


async function suborgById(parent, args, { prisma }, info) {
    console.log("Recieved query",args)
return  await prisma.query.suborg({
    where :{
       id:args.id
    }  
}, info)
}

export  {allsuborgs,suborgsoforg,suborgById}
