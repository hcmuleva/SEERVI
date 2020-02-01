import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function login(parent, args, { prisma }, info) {
    console.log("\n User parameter\t",args)
    const user = await prisma.query.user({
        where: {
            email: args.data.email
        }
    })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return {
        user,
       
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    }
}
export default login