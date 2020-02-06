import {allorgs,orgById,orgByname} from './query/getOrg'
import {allsuborgs,suborgsoforg,suborgById} from './query/getSubOrg'
import {allGroups,groupById} from './query/group'
import {allSubGroups,subgroupById} from './query/subgroups'
import {groupmember,mymembeship} from './query/groupMember'
export const AdminQueryFunction={
    allorgs,orgById,orgByname, 
    allsuborgs,suborgsoforg,suborgById,
    allGroups,groupById,
    allSubGroups,subgroupById,groupmember,mymembeship


}