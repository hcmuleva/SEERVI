import prisma from '../src/prisma'
 beforeAll( async ()=>{
    console.log("CLEANING BOTH ORGS and SUBORGS")
    await prisma.mutation.deleteManyOrganizations()
    await prisma.mutation.deleteManySuborgs()
    await prisma.mutation.deleteManyGroups()
    await prisma.mutation.deleteManySubGroups()
})
