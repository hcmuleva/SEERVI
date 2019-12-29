
import address from '../resolvers/address/query/address'
import getPhoto from '../resolvers/files/getPhoto'
import baseAddresses from './baseAddress/query/baseAddress'
import {UserQueryFunction} from '../resolvers/users/UserQuery'
import {PostQuery} from '../resolvers/posts/PostQuery'
import {CommentsQuery} from '../resolvers/comments/CommentsQuery'
import {BoardQueryFunctions} from '../resolvers/education/CourcesQuery'
const Query = {
    ...UserQueryFunction,
    ...PostQuery,
    ...CommentsQuery,
    ...BoardQueryFunctions,
    address,
    baseAddresses,
    getPhoto
    
}

export { Query as default }