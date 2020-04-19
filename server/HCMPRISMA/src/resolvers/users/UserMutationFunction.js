import {createUser,createUserByAdmin} from './mutation/createUser'
import {createMedium,updateMedium,deleteMedium} from './mutation/medium'
import login from './mutation/loginUser'
import deleteUser from './mutation/deleteUser'
import {updateUser,assignUserToRoles} from './mutation/updateUser'
import updateUserByAdmin from './mutation/updateUserByAdmin'

export const UserMutationFunction = {
    createUser,createUserByAdmin,login,deleteUser,updateUser,assignUserToRoles,
    updateUserByAdmin,createMedium,updateMedium,deleteMedium
    
}

