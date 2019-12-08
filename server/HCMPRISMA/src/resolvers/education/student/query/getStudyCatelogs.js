function getStudyCatelogs(parent, args, { prisma, request }, info){
    const opArgs={}
   return prisma.query.studyCatelogs(opArgs, info)
   
   
}
export default getStudyCatelogs