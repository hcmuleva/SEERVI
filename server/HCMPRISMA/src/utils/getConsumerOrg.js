const consumerOrgId=async (prisma)=>{
       const orgdata= await prisma.query.organizations({where:{ name:"CONSUMERORG"}})
       console.log("orgdata, ", orgdata[0])
       return orgdata[0]

}
export {consumerOrgId}