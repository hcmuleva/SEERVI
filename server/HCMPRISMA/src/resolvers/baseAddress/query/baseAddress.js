 async function baseAddresses(parent, args, { prisma, request }, info) {
    
    const opArgs = 
        {   
            where: {
                
                id: 1
            }
        }
    

   
    console.log("base addressopArgs",JSON.stringify(opArgs))
    const baseAddresses= prisma.query.baseAddress({where:{id:1}}, info)
    console.log("baseAddresses",baseAddresses,"end")
    if (baseAddresses.length === 0) {
        throw new Error('Address not found')
    }

    return baseAddresses[0]
}
export default baseAddresses