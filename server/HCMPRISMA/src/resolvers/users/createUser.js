import getUserId from '../../utils/getUserId'
import hashPassword from '../../utils/hashPassword'
import jwt from 'jsonwebtoken'
async function createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)
    const user = await prisma.mutation.createUser({
        data: {
            ...args.data,
            password
        }
    })
    console.log("CREATE USER has been called")
    return {
        user,
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    }
}
export default createUser  
