// import prisma from '../../src/prisma'
// import ApolloBoost, { gql } from 'apollo-boost'
// import getClient from '../utils/getClient'
// import {createOrg,orgInputData} from './orgmutation.js'
// import {GET_SubOrgById} from './suborgquery'
// import {createSuborg,createSubOrgInputData} from './suborgmutation'
// import {creategroup,createGroupInputData,updategroup,updateGroupInputData} from './grouppmutation'
// import {GET_AllGROUPS,GET_GROUPBYID} from './groupqueries'
// import {createsubgroup,createSubGroupInputData,updatesubgroup,updateSubGroupInputData,deletesubgroup,deleteSubGroupInputData} from './subgroupmutation'
// import {GET_AllSUBGROUPS,GET_SUBGROUPBYID} from './subgroupqueries'
// const client = getClient()
// beforeAll( async ()=>{
//     console.log("CLEANING BOTH ORGS and SUBORGS")
//     await prisma.mutation.deleteManyOrganizations()
//     await prisma.mutation.deleteManySuborgs()
//     await prisma.mutation.deleteManyGroups()
//     await prisma.mutation.deleteManySubGroups()
// })
