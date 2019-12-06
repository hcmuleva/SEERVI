import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UPLOAD_DIR = './images'
const path = require("path");
const shortid = require('shortid')
const { createWriteStream, existsSync, mkdirSync } = require("fs");
import getUserId from '../utils/getUserId'
import singleUpload from './singlefileupload'
import createUser from './users/createUser'
import login from './users/loginUser'
import deleteUser from './users/deleteUser'
import updateUser from './users/updateUser'
import createPost from './posts/createPost'
import deletePost from './posts/deletePost'
import createComment from './comments/createComment'
import deleteComment from './comments/deleteComment'
import updateComment from './comments/updateComment'
const Mutation = {
    /** Users */
    createUser,
    login,
    deleteUser,
    updateUser,
    /** Posts  */
    createPost,
    deletePost,
    /** Comment */
    createComment,
    deleteComment,
    updateComment,
     async createBaseAddress(parent, args, { prisma, request }, info){
         console.log("Data recieved for base asddress::\n ",args.data)
        const address= await prisma.mutation.createBaseAddress({data:args.data},info)  
        console.log("address", address)
        return address

    },
   
    createAddress(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createAddress({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    uploadFile: async (_, { file }) => {
        console.log("File Object",file, "This ",this)
        const { createReadStream, filename, mimetype } = await file;
        const stream = createReadStream()
        const id = shortid.generate()
        const path = `../images/${id}-${filename}`
        //const file = { id, filename, mimetype, path }
        const myReadObject=await new Promise(res =>
          createReadStream()
            .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
            .on("close", res)
        );
        
        console.log("filename",filename)
        //files.push(filename);
  
        return true;
      },
     singleUpload
 
    
}

// exports.MutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     singleUpload: {
//       description: 'Stores a single file.',
//       type: GraphQLNonNull(FileType),
//       args: {
//         file: {
//           description: 'File to store.',
//           type: GraphQLNonNull(GraphQLUpload)
//         }
//       },
//       resolve: (parent, { file }, { storeUpload }) => storeUpload(file)
//     },
//     multipleUpload: {
//       description: 'Stores multiple files.',
//       type: GraphQLNonNull(GraphQLList(GraphQLNonNull(FileType))),
//       args: {
//         files: {
//           description: 'Files to store.',
//           type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLUpload)))
//         }
//       },
//       async resolve(parent, { files }, { storeUpload }) {
//         const { resolve, reject } = await promisesAll.all(
//           files.map(storeUpload)
//         )

//         if (reject.length)
//           reject.forEach(({ name, message }) =>
//             console.error(`${name}: ${message}`)
//           )

//         return resolve
//       }
//     }
//   })
// })


existsSync(path.join(__dirname, "../images")) || mkdirSync(path.join(__dirname, "../images"))
export { Mutation as default }