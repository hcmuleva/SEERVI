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

export const AdminMutation = {
  createOrganization,
  deleteOrganization,
  updateOrganization,

  createSubOrganization,
  deleteSubOrganization,
  updateSubOrganization,
};
