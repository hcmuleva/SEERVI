import hashPassword from '../../../utils/hashPassword'
import jwt from 'jsonwebtoken'
async function createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)
    console.log("User data",args)

    
    const user = await prisma.mutation.createUser({
        data: {
            firstname:args.data.firstname,
            lastname:args.data.lastname,
            email:args.data.email,
            password,
            org:{
                connect: {
                    id: args.data.org,
                }
            }
        }
    })
    console.log("CREATE USER has been called")
    return {
        user,
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    }
}
export default createUser  
