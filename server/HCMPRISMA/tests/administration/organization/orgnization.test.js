import prisma from "../../../src/prisma";
import ApolloBoost, { gql } from "apollo-boost";
import getClient from "../../utils/getClient";
import {
  CREATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from "./mutation/orgmutation.js";
import organizationSeedData, {
  organization_1,
  organization_2,
  organization_3,
} from "../../seedData/admin/organization";

import {
  GET_All_ORGANIZATION,
  GET_ORGANIZATION_BY_ID,
} from "./query/organizationqueries";
import { onError } from "apollo-link-error";

const client = getClient();
beforeAll(organizationSeedData);
/**
 * org tests
 *  @group regression
 *  @group organization/regression
 *  @group organization
 *  @group organization/smoke
 *  @group organization/createorganization
 */

describe("Org Create Test ", () => {
  test("create Org Positive Case", async () => {
    const createOrgResponse = await client.mutate({
      mutation: CREATE_ORGANIZATION,
      variables: {
        data: {
          organization_name: "Second Org Created",
          organization_description: "Testing for Second org",
        },
      },
    });
    const createOrganization_name =
      createOrgResponse.data.createOrganization.organization_name;
    expect(createOrganization_name).toBe("Second Org Created");
  });
});

/**
 * org tests
 *  @group regression
 *  @group organization/regression
 *  @group organization
 *  @group organization/smoke
 *  @group organization/createorganization
 */
describe("Org Read, uppdate and Delete Test", () => {
  test("Read Org Positive Case", async () => {
    const getAllOrganizationResponse = await client.query({
      query: GET_All_ORGANIZATION,
    });

    console.log("This is SEED DATA", organization_1);
    expect(
      getAllOrganizationResponse.data.getAllOrganization.length
    ).toBeGreaterThan(0);
  });

  test("GetOrganization byId Positive Case", async () => {
    const orgId = organization_1.response.id;
    const getOrgById = await client.query({
      query: GET_ORGANIZATION_BY_ID,
      variables: { id: orgId },
    });
    expect(getOrgById.data.getOrganizationById.id).toBe(orgId);
  });

  test("UpdateOrganization byId Positive Case", async () => {
    const orgId = organization_1.response.id;
    const updateOrg = await client.mutate({
      mutation: UPDATE_ORGANIZATION,
      variables: {
        id: orgId,
        data: {
          organization_name: "Updated",
          organization_description: "FieldUpdated",
        },
      },
    });
    console.log("updateOrg", orgId);
    expect(updateOrg.data.updateOrganization.id).toBe(orgId);
    expect(updateOrg.data.updateOrganization.organization_name).toBe("Updated");
  });
});
