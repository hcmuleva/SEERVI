import prisma from '../../src/prisma'
import ApolloBoost, { gql } from 'apollo-boost'
import {createOrg,orgInputData} from '../administration/orgmutation.js'
import {GET_SubOrgById} from '../administration/suborgquery'
import {createSuborg,createSubOrgInputData} from '../administration/suborgmutation'
import {creategroup,createGroupInputData,updategroup,updateGroupInputData} from '../administration/grouppmutation'
import {GET_AllGROUPS,GET_GROUPBYID} from '../administration/groupqueries'
import {createsubgroup,createSubGroupInputData,updatesubgroup,updateSubGroupInputData,deletesubgroup,deleteSubGroupInputData} from '../administration/subgroupmutation'
import {GET_AllSUBGROUPS,GET_SUBGROUPBYID} from '../administration/subgroupqueries'

export const  seedDataCreate = (name, client) => {

    describe( 'Create SubGroup Suite ', () => {
        test('Create SubGroup Test', async ()=>{
            console.log("TestCase For Seed")
        });
    });
}
    