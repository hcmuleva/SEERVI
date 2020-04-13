import hashPassword from '../../../utils/hashPassword'
import jwt from 'jsonwebtoken'
import getUserId from '../../../utils/getUserId'   

async function createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)
    const data=args.data
    if(data.org){
       data['org']={connect:{id:data.org}}
    }
    data['password']=password
    const userData=await prisma.mutation.createUser({
        data  })
        const myuser= {
        user:userData,
        token: jwt.sign({ userId: userData.id }, process.env.JWT_SECRET)
    }

    console.log("my user data",myuser)
    return myuser
}
async function createUserByAdmin(parent, args, { prisma,request }, info) {
    console.log("\n*** Recieved Request \n",args)
     const userCreatedBy = getUserId(request)
    const {firstname,lastname,email,org, suborg}=args.data
    const password = await hashPassword(args.data.password)
    const userData=await prisma.mutation.createUser({
    data: {firstname,lastname,email,password,createdBy:userCreatedBy,org:{connect: {id:org}},suborg:{connect: {id: suborg}}}
    })

    const myuser= {
        user:userData,
        token: jwt.sign({ userId: userData.id }, process.env.JWT_SECRET)
    }
    console.log("my user data",myuser)
    return myuser
}
async function createMedium(params,args, { prisma }, info) {
    return await prisma.mutation.createMedium(args.data,info)
}
async function updateMedium(params,args, { prisma }, info) {
    const mediumExists = await prisma.exists.Medium({ id: args.data.id})
    if (!mediumExists) {
        throw new Error('Unable to update Meddium')
    } 
    return await prisma.mutation.upddateMedium({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
   
}


 
async function deleteMedium(params,args, { prisma }, info) {
       const mediumExists = await prisma.exists.Medium({ id: args.data.id})
    if (!mediumExists) {
        throw new Error('Unable to update Meddium')
    } 
    return await prisma.mutation.deleteMedium({
        where: {
            id: args.id
        }
    }, info)
}
export  {createUser,createUserByAdmin ,createMedium,updateMedium,deleteMedium} 
