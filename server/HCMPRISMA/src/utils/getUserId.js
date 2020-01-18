import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    const header = request.request.headers.authorization
    console.log("HEADER ",header)
    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    } 
    
    return null
}

const getUserFullDetails=(request, requireAuth = true) => {
    const header = request.request.headers.authorization
    console.log("HEADER ",header)
    if (header) {
        const token = header.replace('Bearer ', '')
        console.log("Token",token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

    
        return decoded
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    } 
    
    return null
}
export { getUserId as default,getUserFullDetails }