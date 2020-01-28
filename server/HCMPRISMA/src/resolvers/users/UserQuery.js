import users from './query/users'
import me from './query/me'
import {allorgs,orgByname} from './query/getOrg'
import {allsuborgs,suborgsoforg} from './query/getSubOrg'
export const UserQueryFunction={
    users,
    me,
    allorgs,orgByname, allsuborgs,suborgsoforg,
}