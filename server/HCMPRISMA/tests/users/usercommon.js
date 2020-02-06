import getClient from '../utils/getClient'
import  {createUser,deleteUser,updateUser} from './userMutation'
const client = getClient()
const  userCreate=async (firstname,lastname,email,password,orgid,suborgid)=>{
    const userVariables={data:{firstname,lastname,email,password,org:orgid,suborg:suborgid}}
       return await client.mutate({mutation: createUser, variables:userVariables})
}

export {userCreate}