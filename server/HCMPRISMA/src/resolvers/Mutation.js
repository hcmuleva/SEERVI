import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const path = require("path");

import getUserId from '../utils/getUserId'
import singleUpload from './files/singlefileupload'
import createUser from './users/createUser'
import login from './users/loginUser'
import deleteUser from './users/deleteUser'
import updateUser from './users/updateUser'
import createPost from './posts/createPost'
import deletePost from './posts/deletePost'
import createComment from './comments/createComment'
import deleteComment from './comments/deleteComment'
import updateComment from './comments/updateComment'
import createBaseAddress from './address/createBaseAddress'
import createAddress from './address/createAddress'
import uploadFile from './files/uploadFile'
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
    /** Address */
    createBaseAddress,
    createAddress,
    /** Fileupload */
    singleUpload,
    uploadFile
     
 
    
}





export { Mutation as default }