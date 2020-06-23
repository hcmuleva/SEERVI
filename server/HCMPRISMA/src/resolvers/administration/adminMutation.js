import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from "./mutation/Organization";
import {
  createSubOrganization,
  deleteSubOrganization,
  updateSubOrganization,
} from "./mutation/Sub_Organization.js";
import { createGroup, deleteGroup, updateGroup } from "./mutation/Group.js";

import {
  createSub_Group,
  deleteSub_Group,
  updateSub_Group,
} from "./mutation/Sub_Group";
export const AdminMutation = {
  createOrganization,
  deleteOrganization,
  updateOrganization,

  createSubOrganization,
  deleteSubOrganization,
  updateSubOrganization,

  createGroup,
  deleteGroup,
  updateGroup,

  createSub_Group,
  deleteSub_Group,
  updateSub_Group,
};
