import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../src/prisma";

const organization_1 = {
  input: {
    organization_name: "SEED_ORG_1",
    organization_description: "SEED DATA GENERATED",
    organization_logo: "LOGO WILL BE CREATD USING FAKERS",
    organization_size: 10,
    organization_type: "PRIVATE",
    organization_website: "YET TO BUILD",
  },
  response: undefined,
};
const organization_2 = {
  input: {
    organization_name: "SEED_ORG_2",
    organization_description: "SEED DATA 2 GENERATED",
    organization_logo: "LOGO WILL BE CREATD USING FAKERS",
    organization_size: 10,
    organization_type: "PRIVATE",
    organization_website: "YET TO BUILD",
  },
  response: undefined,
};

const organization_3 = {
  input: {
    organization_name: "SEED_ORG_3",
    organization_description: "SEED DATA 3 GENERATED",
    organization_logo: "LOGO WILL BE CREATD USING FAKERS",
    organization_size: 10,
    organization_type: "PRIVATE",
    organization_website: "YET TO BUILD",
  },
  response: undefined,
};
const seedDatabase = async () => {
  // Create organization_1 Delete purpose
  organization_1.response = await prisma.mutation.createOrganization({
    data: organization_1.input,
  });
  // Create organization_2 update purpose
  organization_2.response = await prisma.mutation.createOrganization({
    data: organization_2.input,
  });
  // Create organization_3 query purpose
  organization_3.response = await prisma.mutation.createOrganization({
    data: organization_3.input,
  });
  console.log(
    "organization_1",
    organization_1,
    " organization_2",
    organization_2,
    " organization_3",
    organization_3
  );
};

export {
  seedDatabase as default,
  organization_1,
  organization_2,
  organization_3,
};
