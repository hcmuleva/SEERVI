import { GraphQLServer, PubSub } from 'graphql-yoga'
//const lowdb = require('lowdb')

import {resolvers,fragmentReplacement} from './resolvers/index'
import prisma from './prisma'
//const mkdirp = require('mkdirp')
//const UPLOAD_DIR = './uploads'
//mkdirp.sync(UPLOAD_DIR)

//const FileSync = require('lowdb/adapters/FileSync')

const pubsub = new PubSub()
// const storeUpload = async upload => {
//     const { createReadStream, filename, mimetype } = await upload
//     const stream = createReadStream()
//     const id = shortid.generate()
//     const path = `${UPLOAD_DIR}/${id}-${filename}`
//     const file = { id, filename, mimetype, path }
  
//     // Store the file in the filesystem.
//     await new Promise((resolve, reject) => {
//       stream
//         .on('error', error => {
//           unlink(path, () => {
//             reject(error)
//           })
//         })
//         .pipe(createWriteStream(path))
//         .on('error', reject)
//         .on('finish', resolve)
//     })
  
  
//     return file
//   }
// async function CreateSelfUser(){
    
//   await prisma.query.organizations({
//         where:{
//             name:"CONSUMER"
//         }
//     }).then((resp)=>{
//          const orgid=resp[0].id
//          console.log("Result",resp)
//          const consumerOrg=prisma.query.suborgs({
//             where:{ 
//                 org:orgid
//             }
//         })
//          console.log("CreateSelfUser",JSON.stringify(consumerOrg[0]))
//      })
     
//     //        
//     // })
   
// }
// CreateSelfUser()
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
   // middlewares: [upload({ uploadHandler: uploadToLocal })],
   resolverValidationOptions: {
    requireResolversForResolveType: false
  },
    context(request) {
        return {
           
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacement
})
export {server as default}