import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../src/prisma";

const organization_1 = {
  input: {
    organization_name: "SEED_ORG_1",
    organization_description: "SEED DATA GENERATED",
    organization_logo: "To BE  UPDATED",
    organization_size: 10,
    organization_type: "PRIVATE",
    organization_website: "YET TO BUILD",
  },
  response: undefined,
};
const sub_organization_1 = (organization) => {
  console.log("Reciieved ORG  ID ", organization);
  const data = {
    input: {
      sub_organization_name: "SEED_SUB_ORGANIZATION_1",
      sub_organization_description:
        "SEED DATA SEED_SUB_ORGANIZATION_1 GENERATED",
      sub_organization_logo: "To BE  UPDATED",
      sub_organization_size: 10,
      sub_organization_type: "PRIVATE",
      sub_organization_website: "YET TO BUILD",
      organization: { connect: { id: organization } },
    },
    response: undefined,
  };
  return data.input;
};

const group_1 = (sub_organization) => {
  console.log("Revieved sub ORG ", sub_organization);
  const data = {
    input: {
      group_name: "SEED_GROP_1",
      group_description: "SEED DATA 1 GENERATED",
      group_logo: "To BE  UPDATED",
      group_size: 10,
      group_type: "PRIVATE",
      group_website: "YET TO BUILD",
      sub_organization: { connect: { id: sub_organization } },
    },
    response: undefined,
  };
  return data.input;
};

const sub_group_1 = (group) => {
  const data = {
    input: {
      sub_group_name: "SEED_SUB_GROP_1",
      sub_group_description: "SEED DATA 1 GENERATED",
      sub_group_logo: "To BE  UPDATED",
      sub_group_size: 10,
      sub_group_type: "PRIVATE",
      sub_group_website: "YET TO BUILD",
      group: { connect: { id: group } },
    },
    response: undefined,
  };
  return data.input;
};
const seedDatabase = async () => {
  // Create organization_1 Delete purpose
  organization_1.response = await prisma.mutation.createOrganization({
    data: organization_1.input,
  });
  // Create organization_2 update purpose
  sub_organization_1.response = await prisma.mutation.createSub_Organization({
    data: sub_organization_1(organization_1.response.id),
  });
  // Create organization_3 query purpose
  group_1.response = await prisma.mutation.createGroup({
    data: group_1(sub_organization_1.response.id),
  });
  sub_group_1.response = await prisma.mutation.createSub_Group({
    data: sub_group_1(group_1.response.id),
  });
  console.log("\n\n\nSub Group Created Respponse ", sub_group_1.response);
};

export { seedDatabase as default, organization_1, sub_organization_1, group_1 };
