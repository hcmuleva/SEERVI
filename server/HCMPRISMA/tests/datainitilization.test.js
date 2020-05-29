import prisma from "../src/prisma";
beforeAll(async () => {
  console.log("\n********\nCLEANING BOTH ORGS and SUBORGS\n********\n");
  await prisma.mutation.deleteManyOrganizations();
  await prisma.mutation.deleteManySuborgs();
  await prisma.mutation.deleteManyGroups();
  await prisma.mutation.deleteManySubGroups();
  console.log(
    "\n********\nCLEANING ACTION OF ORGS and SUBORGS COMPLETED\n********\n"
  );
});
