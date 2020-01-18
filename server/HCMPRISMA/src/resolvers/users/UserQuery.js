import users from './query/users'
import me from './query/me'
import {getOrg,orgByname} from './query/getOrg'
import getSubOrgs from './query/getSubOrg'
import {roles,getUserRoles} from './query/roles'
import {groups} from './query/groups'
import suborgToGroup from './query/getGroupToSubOrg'
export const UserQueryFunction={
    users,
    me,
    getOrg,orgByname,
    roles,getUserRoles,
    groups,
    suborgToGroup,getSubOrgs
}