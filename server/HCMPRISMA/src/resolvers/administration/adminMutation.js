
import {createOrganization,deleteOrg,updateOrg} from './mutation/Organization'
import {createSubOrg,deleteSubOrg,updateSuborg} from './mutation/SubOrg'
import {createGroup,updateGroup,deleteGroup} from './mutation/Group'
import {createSubGroup,deleteSubGroup,updateSubGroup} from './mutation/SubGroup'
export const AdminMutation = {
    createOrganization,deleteOrg,updateOrg,
    createSubOrg,deleteSubOrg,updateSuborg,
    createGroup,updateGroup,deleteGroup,
    createSubGroup,deleteSubGroup,updateSubGroup
    
}

