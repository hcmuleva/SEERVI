
import {UserQueryFunction} from '../resolvers/users/UserQuery'
import {AdminQueryFunction} from '../resolvers/administration/adminqueries'
import {PostQuery} from '../resolvers/posts/PostQuery'
import {CommentsQuery} from '../resolvers/comments/CommentsQuery'
import {subjectSubsQuery} from './profiles/profileQuery'
import {eduQuery} from "./education/educationquery"
const Query = {
    ...UserQueryFunction,
    ...AdminQueryFunction,
    ...PostQuery,
    ...CommentsQuery,
    ...subjectSubsQuery ,
    ...eduQuery   
}

export { Query as default }