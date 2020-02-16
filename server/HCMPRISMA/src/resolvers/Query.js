
import {UserQueryFunction} from '../resolvers/users/UserQuery'
import {AdminQueryFunction} from '../resolvers/administration/adminqueries'
import {PostQuery} from '../resolvers/posts/PostQuery'
import {CommentsQuery} from '../resolvers/comments/CommentsQuery'
import {subjectSubsQuery} from './profiles/profileQuery'

const Query = {
    ...UserQueryFunction,
    ...AdminQueryFunction,
    ...PostQuery,
    ...CommentsQuery,
    ...subjectSubsQuery    
}

export { Query as default }