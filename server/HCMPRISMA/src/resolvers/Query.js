
import {UserQueryFunction} from '../resolvers/users/UserQuery'
import {AdminQueryFunction} from '../resolvers/administration/adminqueries'
import {PostQuery} from '../resolvers/posts/PostQuery'
import {CommentsQuery} from '../resolvers/comments/CommentsQuery'

const Query = {
    ...UserQueryFunction,
    ...AdminQueryFunction,
    ...PostQuery,
    ...CommentsQuery    
}

export { Query as default }