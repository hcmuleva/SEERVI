import {users,getAllMedium} from './query/users'
import loggedInUser from './query/me'
export const UserQueryFunction={
    users,
    loggedInUser,
    getAllMedium
}