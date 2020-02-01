import hashPassword from '../../../utils/hashPassword'
import jwt from 'jsonwebtoken'

async function createUser(parent, args, { prisma }, info) {
    const {firstname,lastname,email,org, suborg}=args.data
    const password = await hashPassword(args.data.password)
    
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
export default createUser  
