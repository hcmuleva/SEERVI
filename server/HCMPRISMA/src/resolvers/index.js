import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Post from './Post'
import Address from './Address'
import BaseAddress from './BaseAddress'
import Comment from './Comment'
import User from './User'
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