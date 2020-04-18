import gql from "graphql-tag";
const CREATE_ORGROLE_ASSIGN_USER = gql`
  mutation CREATE_ORGROLE(
    $name: String!
    $org: String
    $description: String
    $users: Json
  ) {
    createRole(
      data: { name: $name, org: $org, description: $description, users: $users }
    ) {
      name
      id
    }
  }
`;

const CREATE_ORGROLE = gql`
  mutation CREATE_ORGROLE($name: String!, $org: String, $description: String) {
    createRole(data: { name: $name, org: $org, description: $description }) {
      name
      id
    }
  }
`;
const CREATE_SUBORGROLE = gql`
  mutation CREATE_SUBORGROLE(
    $name: String!
    $suborg: String
    $description: String
  ) {
    createRole(
      data: { name: $name, suborg: $suborg, description: $description }
    ) {
      name
      id
    }
  }
`;
const CREATE_GROUPROLE = gql`
  mutation CREATE_GROUPROLE(
    $name: String!
    $group: String
    $description: String
  ) {
    createRole(
      data: { name: $name, group: $group, description: $description }
    ) {
      name
      id
    }
  }
`;
const CREATE_SUBGROUPROLE = gql`
  mutation CREATE_SUBGROUPROLE(
    $name: String!
    $subgroup: String
    $description: String
  ) {
    createRole(
      data: { name: $name, subgroup: $subgroup, description: $description }
    ) {
      name
      id
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation UPDATE_ROLE($id: ID!, $name: String, $description: String) {
    updateRole(id: $id, data: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;

const DELETE_ROLE = gql`
  mutation DELETE_ROLE($id: ID!) {
    deleteRole(id: $id) {
      id
      name
    }
  }
`;
const ASSIGN_ROLE_TO_USERS = gql`
  mutation ASSIGN_ROLE_TO_USERS($id: ID!, $users: Json) {
    assignRoleToUsers(id: $id, data: { users: $users }) {
      id
    }
  }
`;
const ASSIGN_USER_TO_ROLES = gql`
  mutation ASSIGN_USER_TO_ROLES($id: ID!, $roles: Json) {
    assignUserToRoles(id: $id, data: { roles: $roles }) {
      id
    }
  }
`;
export {
  CREATE_ORGROLE_ASSIGN_USER,
  CREATE_ORGROLE,
  CREATE_SUBORGROLE,
  CREATE_GROUPROLE,
  CREATE_SUBGROUPROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  ASSIGN_ROLE_TO_USERS,
  ASSIGN_USER_TO_ROLES,
};
