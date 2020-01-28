import {extractFragmentReplacements} from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Post from './posts/Post'
import Comment from './comments/Comment'
import User from './users/User'
const resolvers= {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment

}
const fragmentReplacement = extractFragmentReplacements(resolvers)
export {resolvers,fragmentReplacement}