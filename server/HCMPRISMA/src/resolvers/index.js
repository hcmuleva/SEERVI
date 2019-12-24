import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Post from './posts/Post'
import Address from './address/Address'
import BaseAddress from './baseAddress/BaseAddress'
import Comment from './comments/Comment'
import User from './users/User'
import StudyCatelog from './education/student/StudyCatelog'
const resolvers= {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
    Address,
    BaseAddress,
    StudyCatelog
}
export {resolvers}