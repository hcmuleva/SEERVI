import prisma from "../../src/prisma";
import ApolloBoost, { gql } from "apollo-boost";
import getClient from "../utils/getClient";
import {
  createOrg,
  orgInputData,
  deleteOrg,
  deleteOrgInputData,
  updateOrg,
  updateOrgInputData,
} from "./orgmutation.js";
import { GET_AllORGS, GET_ORGBYID } from "./orgqueries";
import { onError } from "apollo-link-error";
import OrgService from "../service/provider/OrgService";
const client = getClient();

/**
 * org tests
 *  @group regression
 *  @group org/regression
 *  @group org
 *  @group org/smoke
 *  @group org/createorg
 *  @group org/dynamic
 */
const myOrgs = new OrgService();
const variabledata = {
  data: { name: "", description: "cleaned Demo" },
};

async function bulkOrgCreation(orgData) {
  console.log("ORGDATA", orgData);
  // map through the repo list
  const promises = orgData.map(async (myorgvariable) => {
    console.log("myorgvariable", myorgvariable);
    // request details from GitHub’s API with Axios
    return await client.mutate({
      mutation: createOrg,
      variables: myorgvariable,
    });
  });

  // wait until all promises resolve
  const results = await Promise.all(promises);
  return ressults;
  // use the results
}
const someFunction = () => {
  const myresult = [];
  myOrgs.getAllOrg().map(async (myValue) => {
    let myData = { ...variabledata };
    myData.data.name = myValue.orgname;
    console.log("ORG CREATION DATA", myData);
    const myprom = await client.mutate({
      mutation: createOrg,
      variables: myData,
    });
    Promise.resolve(myprom).then(function(value) {
      console.log("Resolved succss", JSON.stringify(value)); // "Success"
    });
    return myprom;
  });
};
const createDynamicOrg = async (variables) => {
  console.log("CALLED", variables);
  const createdOrg = await client.mutate({
    mutation: createOrg,
    variables,
  });
  console.log("CREATED ORG ", createdOrg);
  return createdOrg;
};
describe("Org Create ", () => {
  test("create Org Positive Case", async () => {
    let myvariables = [];
    myOrgs.getAllOrg().map(async (org) => {
      myvariables.push({
        data: { ...variabledata.data, name: org.orgname },
      });
    });
    const results = bulkOrgCreation(myvariables);

    console.log("RECIIIEVED RESULT", results);
    results.then((responseval, error) => {
      if (error) {
        console.log("ERRor ", error);
      }
      console.log("responseval", responseval);
    });

    // const orgData = myOrgs.getOrg(1);
    // console.log("ORG==>", orgData.orgname);
    //console.log("ORG CREATED org.orgname", org.orgname, " res", orgCreated);

    //console.log("resultArray",resultArray);
    // const createOrgResponse = await client.mutate({
    //   mutation: createOrg,
    //   variables,
    // });
    // console.log("CREATE ORG RES", createOrgResponse);
    // const firstOrg = await prisma.query.organizations({
    //   where: { name: "TESTORG_CREATEUROSE" },
    // });
    // console.log("firstOrg", firstOrg[0]);
    // const createOrgId = createOrgResponse.data.createOrganization.id;
    // const expected = firstOrg[0].id;
    // expect(createOrgId).toBe(expected);
  });
});

// /**
//  * org tests
//  *  @group regression
//  *  @group smoke
//  *  @group org
//  *  @group org/regression
//  *  @group org/smoke
//  *  @group org/deleteorg
//  */

// describe("Org delete ", () => {
//   test("Delete Org Positive Case", async () => {
//     const variables = orgInputData(
//       "TESTORGForDelete",
//       "TestOrg for delete operationDescriptions"
//     );
//     await client
//       .mutate({ mutation: createOrg, variables })
//       .then(async (createOrgResponse) => {
//         const deleteOrgVariable = deleteOrgInputData(
//           createOrgResponse.data.createOrganization.id
//         );
//         const deleteOrgResponse = await client.mutate({
//           mutation: deleteOrg,
//           variables: deleteOrgVariable,
//         });
//         const orgExists = await prisma.exists.Organization({
//           id: deleteOrgResponse.data.deleteOrg.id,
//         });
//         expect(orgExists).toBe(false);
//       });
//   });
// });

// /**
//  * org tests
//  *  @group regression
//  *  @group smoke
//  *  @group org
//  *  @group org/regression
//  *  @group org/smoke
//  *  @group org/updateorg
//  */
// describe("Org update ", () => {
//   test("Update Org Positive Case", async () => {
//     const variables = orgInputData(
//       "TESTORGForUpdate",
//       "TestOrg for Update operationDescriptions"
//     );
//     await client
//       .mutate({ mutation: createOrg, variables })
//       .then(async (createOrgResponse) => {
//         const updateOrgData = updateOrgInputData(
//           createOrgResponse.data.createOrganization.id,
//           "ModifiedTESTORGForUpdate",
//           ""
//         );
//         const updateOrgResponse = await client.mutate({
//           mutation: updateOrg,
//           variables: updateOrgData,
//         });
//         const orgExists = await prisma.exists.Organization({
//           name: "ModifiedTESTORGForUpdate",
//         });
//         expect(orgExists).toBe(true);
//       });
//   });
// });

// /**
//  * org tests
//  *  @group regression
//  *  @group smoke
//  *  @group org
//  *  @group org/regression
//  *  @group org/smoke
//  *  @group org/queryorg
//  */
// describe("Org query test cases ", () => {
//   test("Query Org Positive", async () => {
//     const backendOrg = await prisma.query.organizations({});
//     console.log("backendOrg", backendOrg);
//     const orgsQueryResponse = await client.query({ query: GET_AllORGS });
//     console.log("orgsQueryResponse", orgsQueryResponse.data.allorgs);
//     expect(backendOrg.length).toBe(orgsQueryResponse.data.allorgs.length);
//   });

//   test("Query org by id ", async () => {
//     await prisma.query.organizations({}).then(async (orgsfromBackEnd) => {
//       const firstOrg = orgsfromBackEnd[0];
//       const orgsQueryResponse = await client.query({
//         query: GET_ORGBYID,
//         variables: { id: firstOrg.id },
//       });
//       const recievedOrg = orgsQueryResponse.data.orgById;
//       expect(recievedOrg.name).toBe(firstOrg.name);
//       expect(recievedOrg.id).toBe(firstOrg.id);
//     });
//   });
// });

// /**
//  * org tests
//  *  @group regression
//  *  @group smoke
//  *  @group org
//  *  @group org/regression
//  *  @group org/smoke
//  *  @group org/bothtyes
//  */
// describe("Org Suite for full test ", () => {
//   test("create Org Positive Case WithoutDescription", async () => {
//     const variables = orgInputData("TESTORG1", null);
//     const response = await client.mutate({ mutation: createOrg, variables });
//     const [firstOrg, ...other] = await prisma.query.organizations({
//       where: { name: "TESTORG1" },
//     });
//     const createOrgId = response.data.createOrganization.id;
//     const expected = firstOrg.id;
//     expect(createOrgId).toBe(expected);
//   });

//   test("create Org Negative: Org withoutname", async () => {
//     const variables = orgInputData("", null);
//     try {
//       const { response, error } = await client.mutate({
//         mutation: createOrg,
//         variables,
//       });
//       const [firstOrg, ...other] = await prisma.query.organizations({
//         where: { name: null },
//       });
//       const createOrgId = response.data.createOrganization.id;
//       const expected = firstOrg.id;
//       expect(createOrgId).toBe(expected);
//     } catch (err) {
//       console.log("HCMFound Error ", err.message);
//       expect(
//         "GraphQL error: Organization creation failed, because organization name can not be null"
//       ).toBe(err.message);
//     }
//   });
// });
