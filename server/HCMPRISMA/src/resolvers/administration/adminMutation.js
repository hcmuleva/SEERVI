
import {createOrganization,deleteOrg,updateOrg} from './mutation/Organization'
import {createSubOrg,deleteSubOrg,updateSuborg} from './mutation/SubOrg'
import {createGroup,updateGroup,deleteGroup} from './mutation/Group'
import {createSubGroup,deleteSubGroup,updateSubGroup} from './mutation/SubGroup'
import {assignUserToGroup,deleteUserToGroup,updateUserToGroup} from './mutation/UserToGroup'
import {assignUserToSubGroup,deleteUserToSubGroup,updateUserToSubGroup} from './mutation/UserToSubGroup'
import {createOrgRole,createSubOrgRole, createGroupRole,createSubGroupRole,updateRole,deleteRole} from './mutation/Role'
import {createUserRole,assignBulkRoleToUser,deleteUserRole,updateUserRole} from './mutation/UserRole'
export const AdminMutation = {
    createOrganization,deleteOrg,updateOrg,
    createSubOrg,deleteSubOrg,updateSuborg,
    createGroup,updateGroup,deleteGroup,
    createSubGroup,deleteSubGroup,updateSubGroup,
    assignUserToGroup,deleteUserToGroup,updateUserToGroup,
    assignUserToSubGroup,deleteUserToSubGroup,updateUserToSubGroup,
    createOrgRole,createSubOrgRole, createGroupRole,createSubGroupRole,updateRole,deleteRole,
    createUserRole,assignBulkRoleToUser,deleteUserRole,updateUserRole
    
}

