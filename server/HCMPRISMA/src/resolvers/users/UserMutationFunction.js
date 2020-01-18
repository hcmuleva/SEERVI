import createUser from './mutation/createUser'
import login from './mutation/loginUser'
import deleteUser from './mutation/deleteUser'
import {createOrganization,deleteOrganization} from './mutation/createOrganization'
import createRole from './mutation/createRole'
import updateUser from './mutation/updateUser'
import createSubOrg from './mutation/createSubOrg'
import createGroup from './mutation/createGroup'
import updateUserByAdmin from './mutation/updateUserByAdmin'
import {createGroupsToSubOrg} from './mutation/createGroupToSubOrg'

export const UserMutationFunction = {
    createUser,login,deleteUser,updateUser,
    createOrganization,deleteOrganization,createRole,createSubOrg,createGroupsToSubOrg,
    createGroup,updateUserByAdmin
    
}

