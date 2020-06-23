import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
const GET_All_SUB_ORGANIZATION = gql`
  query {
    getAllSubOrganization {
      id
      sub_organization_name
    }
  }
`;
const GET_SUB_ORGANIZATION_BY_ID = gql`
  query($id: ID!) {
    getSubOrganizationById(id: $id) {
      id
      sub_organization_name
    }
  }
`;

export { GET_All_SUB_ORGANIZATION, GET_SUB_ORGANIZATION_BY_ID };
