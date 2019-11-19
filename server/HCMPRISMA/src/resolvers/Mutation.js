import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const { FileType } = require('./File')
const UPLOAD_DIR = './images'
const path = require("path");
const shortid = require('shortid')
const { createReadStream,createWriteStream, existsSync, mkdirSync } = require("fs");
const { GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql')

import getUserId from '../utils/getUserId'

import hashPassword from '../utils/hashPassword'


const Mutation = {
    
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
        }
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        if(typeof args.data.password === 'string'){
            args.data.password=await hashPassword(args.data.password)
        }
        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        console.log("CreatePost Mutation.js userID:: ",userId," ARGS::",args)
        return prisma.mutation.createPost({
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
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })
        if (!postExists) {
            throw new Error('Unable to delete post')
        }    
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists) {
            throw new Error('Unable to update post')
        }

        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },

     async createBaseAddress(parent, args, { prisma, request }, info){
         console.log("Data recieved for base asddress::\n ",args.data)
        const address= await prisma.mutation.createBaseAddress({data:args.data},info)  
        console.log("address", address)
        return address

    },
    
    
    createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)
    },
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('Unable to delete comment')
        }

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('Unable to update comment')
        }

        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
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
     async singleUpload(parent, args, { prisma, request }, info) {     
        console.log("updload",args)
        const { createReadStream, filename, mimetype } = await args.file;
        const stream = createReadStream()
        const id = shortid.generate()
        
        await new Promise((resolve, reject) => {
            stream
            .on('error', error => {
                unlink(path, () => {
                reject(error)
                })
            })
            .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
            .on('error', reject)
            .on('finish', resolve)
        })
        return { id, filename, mimetype, path }
   }
 
    
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