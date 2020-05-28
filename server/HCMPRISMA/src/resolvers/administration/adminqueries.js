import { allorgs, orgById, orgByname } from "./query/getOrg";
import { allsuborgs, suborgsoforg, suborgById } from "./query/getSubOrg";
import { allGroups, groupById, groupsOfSubOrg } from "./query/group";
import {
  allSubGroups,
  subgroupById,
  subgroupsOfGroup,
} from "./query/subgroups";
import { userRoleByUserId, alluserroles } from "./query/UserRole";
import {
  allroles,
  orgRoles,
  suborgRoles,
  groupRoles,
  subGroupRoles,
  roleById,
} from "./query/roles";
export const AdminQueryFunction = {
  allorgs,
  orgById,
  orgByname,
  allsuborgs,
  suborgsoforg,
  suborgById,
  allGroups,
  groupById,
  groupsOfSubOrg,
  allSubGroups,
  subgroupById,
  subgroupsOfGroup,
  allroles,
  orgRoles,
  suborgRoles,
  groupRoles,
  subGroupRoles,
  roleById,
  userRoleByUserId,
  alluserroles,
};
