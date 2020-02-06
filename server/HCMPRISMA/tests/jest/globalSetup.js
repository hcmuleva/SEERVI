require('@babel/register')
require('@babel/polyfill/noConflict')
import prisma from '../../src/prisma'

const server = require('../../src/server').default
const cleanupData=async ()=>{
    console.log("\n\n\n**********\n\n\n")
    console.log("\n *****CLEANING BOTH ORGS and SUBORGS from Global setpup\n")
    await prisma.mutation.deleteManyOrganizations()
    await prisma.mutation.deleteManySuborgs()
    await prisma.mutation.deleteManyGroups()
    await prisma.mutation.deleteManySubGroups()
    await prisma.mutation.deleteManyUsers()
    
     console.log("\n\n\n****DONE******\n\n\n")
}
module.exports = async () => {
    console.log("TEST Server starting")
    global.httpServer = await server.start({ port: 5000 })
    cleanupData()
}

