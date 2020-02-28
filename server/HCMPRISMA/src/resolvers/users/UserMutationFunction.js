import {createUser,createUserByAdmin,createMedium} from './mutation/createUser'
import login from './mutation/loginUser'
import deleteUser from './mutation/deleteUser'
import updateUser from './mutation/updateUser'
import updateUserByAdmin from './mutation/updateUserByAdmin'

export const UserMutationFunction = {
    createUser,createUserByAdmin,login,deleteUser,updateUser,
    updateUserByAdmin,createMedium
    
}

