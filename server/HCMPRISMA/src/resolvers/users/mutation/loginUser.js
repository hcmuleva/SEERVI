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
    let subs=[]
    // console.log("")
    // const subscriptionsExist=await prisma.exists.SubjectSubscription({
    //     userid:user.id
    // })
    // console.log("subscriptionsExist",subscriptionsExist)
    // if(!subscriptionsExist){
    //     throw new Error('Please subscribe to proceed further')
    // }
     const opArgs = {
        where: {
            id: {
                id:user.id
            }
        }
    }
    const userid=user.id
    subs= await prisma.query.subjectSubscriptions({userid:{where:{id:user.id}}})
    console.log("subs",subs)
    return {
        user,
        subs,
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    }
}
export default login