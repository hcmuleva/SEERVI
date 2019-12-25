import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const path = require("path");

import getUserId from '../utils/getUserId'
import singleUpload from './files/singlefileupload'
import {UserMutationFunction} from './users/UserMutationFunction'
import {PostMutationFunctions} from './posts/PostMutationFunctions'
import {CommentsMutationFunction} from './comments/CommentsMutationFunction'
import createAddress from './address/mutation/createAddress'
import createBaseAddress from './baseAddress/mutation/createBaseAddress'
import uploadFile from './files/uploadFile'
import createStudyCatelog from './education/student/mutation/createStudyCatelog'
const Mutation = {
    /** Users */
    ...UserMutationFunction,
    /** Posts  and comments*/
    ...PostMutationFunctions,...CommentsMutationFunction,
    /** Address */
    createBaseAddress,createAddress,
    /** Fileupload */
    singleUpload,uploadFile,
    /** Education Student*/
    createStudyCatelog, 
 
    
 
    
}





export { Mutation as default }