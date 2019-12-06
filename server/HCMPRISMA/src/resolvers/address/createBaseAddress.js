
     async function createBaseAddress(parent, args, { prisma, request }, info){
        console.log("Data recieved for base asddress::\n ",args.data)
       const address= await prisma.mutation.createBaseAddress({data:args.data},info)  
       console.log("address", address)
       return address

   }
   export default createBaseAddress