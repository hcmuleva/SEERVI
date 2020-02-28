import {allorgs,orgById,orgByname} from './query/getOrg'
import {allsuborgs,suborgsoforg,suborgById} from './query/getSubOrg'
import {allGroups,groupById,groupsOfSubOrg} from './query/group'
import {allSubGroups,subgroupById,subgroupsOfGroup} from './query/subgroups'
import {groupmember,mymembeship} from './query/groupMember'
import {allRoles,myRoles,orgRoles,subOrgRoles,groupRoles,subGroupRoles} from './query/roles'
export const AdminQueryFunction={
    allorgs,orgById,orgByname, 
    allsuborgs,suborgsoforg,suborgById,
    allGroups,groupById,groupsOfSubOrg,
    allSubGroups,subgroupById,subgroupsOfGroup,groupmember,mymembeship,
    allRoles,myRoles,orgRoles,subOrgRoles,groupRoles,subGroupRoles


}