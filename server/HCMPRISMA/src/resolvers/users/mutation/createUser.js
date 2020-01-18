import hashPassword from '../../../utils/hashPassword'
import jwt from 'jsonwebtoken'
async function createUser(parent, args, { prisma }, info) {
    console.log("")
    const password = await hashPassword(args.data.password)
    console.log("User data",args)
    const userData = await prisma.mutation.createUser({
        data: {
            firstname:args.data.firstname,
            lastname:args.data.lastname,
            email:args.data.email,
            password,
            org:{
                connect: {
                    id: args.data.org
                }
            },
            subOrgs:{
                connect: {
                    id: args.data.subOrg
                }
            }
        }
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
