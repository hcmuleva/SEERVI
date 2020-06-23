import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
const GET_All_ORGANIZATION = gql`
  query {
    getAllOrganization {
      id
      organization_name
    }
  }
`;
const GET_ORGANIZATION_BY_ID = gql`
  query($id: ID!) {
    getOrganizationById(id: $id) {
      id
      organization_name
    }
  }
`;

export { GET_All_ORGANIZATION, GET_ORGANIZATION_BY_ID };
