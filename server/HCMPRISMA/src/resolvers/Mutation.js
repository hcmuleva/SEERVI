import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const path = require("path");

import getUserId from '../utils/getUserId'
import singleUpload from './files/singlefileupload'
import createUser from './users/mutation/createUser'
import login from './users/mutation/loginUser'
import deleteUser from './users/mutation/deleteUser'
import updateUser from './users/mutation/updateUser'
import createPost from './posts/mutation/createPost'
import deletePost from './posts/mutation/deletePost'
import updatePost from './posts/mutation/updatePost'
import createComment from './comments/mutation/createComment'
import deleteComment from './comments/mutation/deleteComment'
import updateComment from './comments/mutation/updateComment'
import createBaseAddress from './address/mutation/createBaseAddress'
import createAddress from './address/mutation/createAddress'
import uploadFile from './files/uploadFile'
import createStudyCatelog from './education/student/createStudyCatelog'
const Mutation = {
    /** Users */
    createUser,
    login,
    deleteUser,
    updateUser,
    /** Posts  */
    createPost,
    deletePost,
    updatePost,
    /** Comment */
    createComment,
    deleteComment,
    updateComment,
    /** Address */
    createBaseAddress,
    createAddress,
    /** Fileupload */
    singleUpload,
    uploadFile,
    /** Education Student*/
    createStudyCatelog
 
    
}





export { Mutation as default }