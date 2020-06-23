import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
//Orgnization Create Operation
const CREATE_ORGANIZATION = gql`
  mutation($data: CreateOrganizationInput!) {
    createOrganization(data: $data) {
      id
      organization_name
      organization_description
    }
  }
`;

const DELETE_ORGANIZATION = gql`
  mutation($id: ID!) {
    deleteOrganization(id: $id) {
      id
      organization_name
      organization_description
    }
  }
`;

const UPDATE_ORGANIZATION = gql`
  mutation($id: ID!, $data: UpdateOrganizationInpput!) {
    updateOrganization(id: $id, data: $data) {
      id
      organization_name
      organization_description
    }
  }
`;

export { CREATE_ORGANIZATION, DELETE_ORGANIZATION, UPDATE_ORGANIZATION };
