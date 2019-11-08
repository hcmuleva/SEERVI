import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import {resolvers} from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()
 

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            db,
            pubsub,
            prisma,
            request
        }
    }
})
export {server as default}