import { getAllOrganization, getOrganizationById } from "./query/Organization";
import {
  getAllSubOrganization,
  getSubOrganizationById,
} from "./query/Sub_Organization.js";
export const AdminQueryFunction = {
  getAllOrganization,
  getOrganizationById,
  getAllSubOrganization,
  getSubOrganizationById,
};
