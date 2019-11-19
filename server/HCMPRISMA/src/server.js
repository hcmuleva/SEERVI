import { GraphQLServer, PubSub } from 'graphql-yoga'
const lowdb = require('lowdb')

import db from './db'
import {resolvers} from './resolvers/index'
import prisma from './prisma'
const mkdirp = require('mkdirp')
const UPLOAD_DIR = './uploads'
mkdirp.sync(UPLOAD_DIR)

const FileSync = require('lowdb/adapters/FileSync')

const localdb = lowdb(new FileSync('db.json'))

const pubsub = new PubSub()
const storeUpload = async upload => {
    const { createReadStream, filename, mimetype } = await upload
    const stream = createReadStream()
    const id = shortid.generate()
    const path = `${UPLOAD_DIR}/${id}-${filename}`
    const file = { id, filename, mimetype, path }
  
    // Store the file in the filesystem.
    await new Promise((resolve, reject) => {
      stream
        .on('error', error => {
          unlink(path, () => {
            reject(error)
          })
        })
        .pipe(createWriteStream(path))
        .on('error', reject)
        .on('finish', resolve)
    })
  
  
    return file
  }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
   // middlewares: [upload({ uploadHandler: uploadToLocal })],

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