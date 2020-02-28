import gql from "graphql-tag";


const CREATE_ORG = gql`
  mutation CREATEORG($name: String!, $description: String!) {
    createOrganization(data: { name: $name, description: $description }) {
      name
      id
      description
    }
  }
`;

const CREATE_SUBORG = gql`
  mutation CREATESUBORG($name: String!, $org: String!,$description:String) {
    createSubOrg(data: { name: $name, orgid: $org ,description:$description}) {
      name
      id
      
    }
  }
`;

const CREATE_GROUP = gql`
  mutation CREATESGROUP($name: String!, $suborgid: String!,$description:String) {
    createGroup(data: { name: $name, suborgid: $suborgid ,description:$description}) {
      name
      id
      
    }
  }
`;
const CREATE_SUBGROUP = gql`
  mutation CREATE_SUBGROUP($name: String!, $groupid: String!,$description:String) {
    createSubGroup(data: { name: $name, groupid: $groupid ,description:$description}) {
      name
      id
      
    }
  }
`;
const CREATE_ORGROLE=gql`
mutation CREATE_ORGROLE($name: String!, $org: String!,$description:String) {
    orgRoles(data: { name: $name, org: $org ,description:$description}) {
      name
      id
    }
  }
`;
const CREATE_SUBORGROLE=gql`
mutation CREATE_SUBORGROLE($name: String!, $suborg: String!,$description:String) {
    groupRoles(data: { name: $name, suborg: $suborg ,description:$description}) {
      name
      id
    }
  }
`;
const CREATE_GROUPROLE=gql`
mutation CREATE_GROUPROLE($name: String!, $group: String!,$description:String) {
    orgRoles(data: { name: $name, group: $group ,description:$description}) {
      name
      id
    }
  }
`;
const CREATE_SUBGROUPROLE=gql`
mutation CREATE_SUBGROUPROLE($name: String!, $subgroup: String!,$description:String) {
    orgRoles(data: { name: $name, subgroup: $subgroup ,description:$description}) {
      name
      id
    }
  }
`;

const UPDATE_ORG = gql`
  mutation UPDATE_ORG($id: ID!, $name: String, $description: String) {
    updateOrg(id: $id, data:{name:$name,description:$description}) {
      id
      name
      description
    }
  }
`;



const UPDATE_SUBORG = gql`
  mutation UPDATE_SUBORG($id: ID!, $name: String, $description: String) {
    updateSuborg(id: $id, data:{name:$name,description:$description}) {
      id
      name
      description
    }
  }
`;


const UPDATE_GROUP = gql`
  mutation UPDATE_GROUP($id: ID!, $name: String, $description: String) {
    updateGroup(id: $id, data:{name:$name,description:$description}) {
      id
      name
      description
    }
  }
`;

const UPDATE_SUBGROUP = gql`
  mutation UPDATE_SUBGROUP($id: ID!, $name: String, $description: String) {
    updateSubGroup(id: $id, data:{name:$name,description:$description}) {
      id
      name
      description
    }
  }
`;
const DELETE_ORG = gql`
  mutation DELETEORG($id: ID!) {
    deleteOrg(id: $id) {
      id
      name
    }
  }
`;
const DELETE_SUBORG = gql`
  mutation DELETESUBORG($id: ID!) {
    deleteSubOrg(id: $id) {
      id
      name
    }
  }
`;

const DELETE_GROUP = gql`
  mutation DELETE_GROUP($id: ID!) {
    deleteGroup(id: $id) {
      id
      name
    }
  }
`;
const DELETE_SUBGROUP = gql`
  mutation DELETE_SUBGROUP($id: ID!) {
    deleteSubGroup(id: $id) {
      id
      name
    }
  }
`;


export { CREATE_ORG,UPDATE_ORG, DELETE_ORG, 
CREATE_SUBORG,UPDATE_SUBORG,
DELETE_SUBORG,CREATE_GROUP,UPDATE_GROUP,DELETE_GROUP,
CREATE_SUBGROUP,UPDATE_SUBGROUP,DELETE_SUBGROUP,
CREATE_ORGROLE,CREATE_SUBORGROLE,CREATE_GROUPROLE,CREATE_SUBGROUPROLE

 };
