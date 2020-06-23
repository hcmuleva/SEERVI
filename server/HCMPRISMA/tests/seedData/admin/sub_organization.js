import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../src/prisma";

const orgData = {
  input: {
    organization_name: "SEED_ORG_FOR_SUBORG",
    organization_description: "SEED DATA 3 GENERATED",
    organization_logo: "To BE  UPDATED",
    organization_size: 10,
    organization_type: "PRIVATE",
    organization_website: "YET TO BUILD",
  },
  response: undefined,
};
const sub_organization_1 = {
  input: {
    sub_organization_name: "SEED_SUB_ORG_1",
    sub_organization_description: "SEED DATA GENERATED",
    sub_organization_logo: "To BE  UPDATED",
    sub_organization_size: 10,
    sub_organization_type: "PRIVATE",
    sub_organization_website: "YET TO BUILD",
    organization: undefined,
  },
  response: undefined,
};
const sub_organization_2 = {
  input: {
    sub_organization_name: "a1suborg3",
    sub_organization_size: 12,
    sub_organization_logo: "dummylogo",
    sub_organization_website: "dwebsite",
    sub_organization_type: "Test",
    sub_organization_description: "Test",
    organization: undefined,
  },
  response: undefined,
};

const subOrganization_seedData = async () => {
  orgData.response = await prisma.mutation
    .createOrganization({
      data: orgData.input,
    })
    .then(async (response) => {
      console.log("Response for SEED DATA ", response.id);
      sub_organization_2.input["organization"] = response.id;
      console.log("Before CREATE OBJECT ", sub_organization_2);
      await prisma.mutation
        .createSub_Organization({
          data: sub_organization_2.input,
        })
        .then((suborgresp) => {
          console.log("SUB ORG CREATED and response =>", suborgresp);
        });
    });

  // Create sub_organization_1 Delete purpose
};

export {
  subOrganization_seedData as default,
  //sub_organization_1,
  //sub_organization_2,
};
