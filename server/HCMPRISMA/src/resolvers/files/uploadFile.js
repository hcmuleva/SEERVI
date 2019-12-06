const UPLOAD_DIR = './images'    
const shortid = require('shortid')
const { createWriteStream, existsSync, mkdirSync } = require("fs");
const path = require("path");
async function uploadFile  (_, { file }) {
    console.log("File Object",file, "This ",this)
    const { createReadStream, filename, mimetype } = await file;
    const id = shortid.generate()
    const filenameWithId=`${id}-${filename}`
    await new Promise(res =>
      createReadStream()
        .pipe(createWriteStream(path.join(__dirname, UPLOAD_DIR, filenameWithId)))
        .on("close", res)
    );
    
    console.log("filename",filename)

    return true;
  }
  export default uploadFile   

  existsSync(path.join(__dirname, "../images")) || mkdirSync(path.join(__dirname, "../images"))

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
