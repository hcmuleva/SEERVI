function createMembership(parent,args,{prisma,request},info){
    console.log("RECIEVED createMembership REQUEST",args.data)
     return prisma.mutation.createMembership({
        data: {
            name:args.data.name,    
            description:args.data.description,
            status:args.data.status,
            userid:{connect:{id:args.data.userid}}, 
            subgroup: {
                connect:{
                    id:args.data.subgroup
                }
            }
        }
    }, info)
}