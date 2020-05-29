import {
  createOrganization,
  deleteOrg,
  updateOrg,
  orgOnboardBySuperAdmin,
} from "./mutation/Organization";
import { createSubOrg, deleteSubOrg, updateSuborg } from "./mutation/SubOrg";
import { createGroup, updateGroup, deleteGroup } from "./mutation/Group";
import {
  createSubGroup,
  deleteSubGroup,
  updateSubGroup,
} from "./mutation/SubGroup";

import { createRole, updateRoleById, deleteRoleById } from "./mutation/Role";
import {
  createUserRole,
  deleteUserRole,
  updateUserRole,
} from "./mutation/UserRole";
export const AdminMutation = {
  createOrganization,
  deleteOrg,
  updateOrg,
  orgOnboardBySuperAdmin,
  createSubOrg,
  deleteSubOrg,
  updateSuborg,
  createGroup,
  updateGroup,
  deleteGroup,
  createSubGroup,
  deleteSubGroup,
  updateSubGroup,

  createRole,
  updateRoleById,
  deleteRoleById,
  createUserRole,
  deleteUserRole,
  updateUserRole,
};
