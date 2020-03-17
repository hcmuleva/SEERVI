import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const path = require("path");

import getUserId from '../utils/getUserId'
import singleUpload from './files/singlefileupload'
import {UserMutationFunction} from './users/UserMutationFunction'
import {PostMutationFunctions} from './posts/PostMutationFunctions'
import {CommentsMutationFunction} from './comments/CommentsMutationFunction'
import {AdminMutation} from './administration/adminMutation'
import {subjectSubs} from './profiles/profileMutation'
import {educationMutation} from './education/educationmutation'
const Mutation = {
    /** Administrator mutations */
    ...AdminMutation,
    /** Users */
    ...UserMutationFunction,
    /** Posts  and comments*/
    ...PostMutationFunctions,
    ...CommentsMutationFunction,
    /** Subject Subscription  */
    ...subjectSubs,
    /** Education */
    ...educationMutation

}





export { Mutation as default }