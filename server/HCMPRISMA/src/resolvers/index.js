import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Post from './posts/Post'
import Address from './address/Address'
import BaseAddress from './address/BaseAddress'
import Comment from './comments/Comment'
import User from './users/User'
const resolvers= {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
    Address,
    BaseAddress
}
export {resolvers}