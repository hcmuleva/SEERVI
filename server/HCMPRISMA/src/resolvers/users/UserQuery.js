import {users,usersRoleId} from './query/users'
import {getAllMedium} from './query/medium'
import {loggedInUser,getMyOrg} from './query/me'
export const UserQueryFunction={
    users,usersRoleId,
    loggedInUser,getMyOrg,
    getAllMedium
}