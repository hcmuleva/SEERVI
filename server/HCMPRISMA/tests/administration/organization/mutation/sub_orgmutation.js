import "cross-fetch/polyfill";
import { gql } from "apollo-boost";

//Orgnization Create Operation
const CREATE_SUB_ORGANIZATION = gql`
  mutation($data: CreateSubOrganizationInput!) {
    createSubOrganization(data: $data) {
      id
      sub_organization_name
      sub_organization_description
    }
  }
`;

const DELETE_SUB_ORGANIZATION = gql`
  mutation($id: ID!) {
    deleteSubOrganization(id: $id) {
      id
      sub_organization_name
      sub_organization_description
    }
  }
`;

const UPDATE_ORGANIZATION = gql`
  mutation($id: ID!, $data: UpdateSubOrganizationInpput!) {
    updateSubOrganization(id: $id, data: $data) {
      id
      sub_organization_name
      sub_organization_description
    }
  }
`;

export {
  CREATE_SUB_ORGANIZATION,
  DELETE_SUB_ORGANIZATION,
  UPDATE_SUB_ORGANIZATION,
};
