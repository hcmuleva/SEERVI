import bcrypt from 'bcrypt'
const hasPassword=(password)=>{
    if (password.length < 6) {
        throw new Error('Password must be 8 characters or longer.')
    }
    return  bcrypt.hash(password, 10)
}
export {hasPassword as default }