
async function groupmember(parent, args, { prisma, request }, info) {
    console.log("RECIEVED Args",args)
   
    const memberlist= await prisma.query.groupMembers({
        userid: {
            connect:{id:args.query}
        }
        }, info)

     const matchedMember=memberlist.filter((elm)=>{
         if(elm.userid.id===args.query){
             return elm
         }
     })
    return matchedMember;
}
function mymembeship(parent,args,{prisma,request},info){
     const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            userid: args.query
        }
       

        return prisma.query.groupMembers(opArgs,info) 
}
export {groupmember,mymembeship}