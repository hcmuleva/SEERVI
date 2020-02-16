require('@babel/register')
require('@babel/polyfill/noConflict')
import prisma from '../../src/prisma'

const server = require('../../src/server').default
const cleanupData=async ()=>{
    console.log("\n *****CLEANING BOTH ORGS and SUBORGS from Global setpup\n")
    await prisma.mutation.deleteManyOrganizations()
    console.log("\n*****ORG DELETED*****\n")
    await prisma.mutation.deleteManySuborgs()
    console.log("\n*****SUBORG DELETED*****\n")
    await prisma.mutation.deleteManyGroups()
    console.log("\n*****GROUP DELETED*****\n")
    await prisma.mutation.deleteManySubGroups()
    console.log("\n*****SUBGROUPS DELETED*****\n")
    await prisma.mutation.deleteManyUsers()
    console.log("\n*****USERS DELETED*****\n")
     console.log("\n\n\n****CleaningDONE******\n\n\n")
}
module.exports = async () => {
    console.log("TEST Server starting")
    global.httpServer = await server.start({ port: 5000 })
    cleanupData()
}

