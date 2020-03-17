
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
async function mymembeship(parent,args,{prisma,request},info){
    console.log("args.query  ",args.query)
     const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            userid: args.query
        }
       

        const myData= await prisma.query.groupMembers(opArgs,info) 
        console.log("myData",myData)
        return myData
}
export {groupmember,mymembeship}