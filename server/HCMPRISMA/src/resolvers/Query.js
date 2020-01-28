
import {UserQueryFunction} from '../resolvers/users/UserQuery'
import {PostQuery} from '../resolvers/posts/PostQuery'
import {CommentsQuery} from '../resolvers/comments/CommentsQuery'
const Query = {
    ...UserQueryFunction,
    ...PostQuery,
    ...CommentsQuery    
}

export { Query as default }