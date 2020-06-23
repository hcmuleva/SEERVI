import { getAllOrganization, getOrganizationById } from "./query/Organization";
import {
  getAllSubOrganization,
  getSubOrganizationById,
} from "./query/Sub_Organization.js";
import { getAllGroup, getGroupById } from "./query/Group";
import { getAllSub_Group, getSub_GroupById } from "./query/Sub_Group";
export const AdminQueryFunction = {
  getAllOrganization,
  getOrganizationById,
  getAllSubOrganization,
  getSubOrganizationById,
  getAllGroup,
  getGroupById,
  getAllSub_Group,
  getSub_GroupById,
};
