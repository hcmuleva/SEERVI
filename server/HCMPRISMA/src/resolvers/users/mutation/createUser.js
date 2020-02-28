import hashPassword from '../../../utils/hashPassword'
import jwt from 'jsonwebtoken'
import getUserId from '../../../utils/getUserId'   

async function createUser(parent, args, { prisma }, info) {
    console.log("RECIEVED CREATE USER REQUEST ",args.data)
    const {firstname,lastname,email,myorg, mysuborg}=args.data
    const password = await hashPassword(args.data.password)
    let org=myorg
    let suborg =mysuborg
    if(!org){
        console.log("orgDataList before")
        const orgData= await prisma.query.organizations({name:"SEERVI"})
        //const orgData= orgDataList.filter((elm)=>elm.name=="SEERVI")
        console.log("orgData",orgData)
        org=orgData[0].id
    }
    if(!suborg){
        const suborgData=await prisma.query.suborgs({name:"KARI"})
        suborg=suborgData[0].id
    }
    const userData=await prisma.mutation.createUser({
        data: {firstname,lastname,email,password,org:{connect: {id:org}},suborg:{connect: {id: suborg}}}
        })
    
    //Self user should be part of education->acadamic group, and role =student.
    //return group and role...
    // TBD: This need to fix it...
    console.log("\n***********Warning*********\n")
    console.log("\nCreated URS ",userData,"\n Self user should be part of education->acadamic group, and role =student\n This need to fix it")
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
export  {createUser,createUserByAdmin ,createMedium} 
