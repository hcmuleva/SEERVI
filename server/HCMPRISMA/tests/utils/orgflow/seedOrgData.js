import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../../src/prisma'

const orgOne = {
    input: {
        name: 'SEERVI',
        description: 'THIS IS FOR OUR SOCIETY'
    },
    organization: undefined
}

const subOrgOne = {
    input: {
        name: 'KARI'    },
    subOrg: undefined
}
const  subOrgArr =(suborgName)=>{return {
    input: {
        name: suborgName  },
    subOrg: undefined
}}
const getGroupInput=(groupName)=>{
    return {
       input: {
        name: groupName
    },
    group: undefined 
    }
}
const groupOne = {
    input: {
        name: 'SEED_GROUP_ONE'
    },
    group: undefined
}
const groupTwo = {
    input: {
        name: 'SEED_GROUP_TWO'
    },
    group: undefined
}
const getRoleInput=(roleName,rolelevel)=>{
    return  {
    input: {
        rolename: roleName,
        rolelevel:rolelevel

    },
    role: undefined
}
}
const roleOne = {
    input: {
        rolename: 'SEED_ROLE_ONE',
        rolelevel:'orglevel'

    },
    role: undefined
}
const roleTwo = {
    input: {
        rolename: 'SEED_ROLE_TWO',
        rolelevel:'suborglevel'
    },
    role: undefined
}
const getUserInput=(firstname,lastname,email,password)=>{

    console.log("Password",password)
    return {
        input: {
        lastname: lastname,
        firstname:firstname,   
        email: email,
        password: bcrypt.hashSync(password)

    },
    user: undefined,
    jwt: undefined
    }
}
const userOne = {
    input: {
        lastname: 'SEED',
        firstname:"USERONE",   
        email: 'seeduser@example.com',
        password: bcrypt.hashSync('welcome123')

    },
    user: undefined,
    jwt: undefined
}

const userGroupOne ={
    group:undefined,
    role:undefined,
    user:undefined
}
const seedOrgDatabase = async () => {
    // Delete org flow data
    // await prisma.mutation.deleteManyOrganizations()
    // //await prisma.mutation.deleteManySubOrgs()
    // await prisma.mutation.deleteManyGroups()
    // await prisma.mutation.deleteManyRoles()
    // await prisma.mutation.deleteManyUsers()
    //CreateORG
    orgOne.organization=await prisma.mutation.createOrganization({
        data:orgOne.input
    })
    //CreateSubORg
    subOrgOne.subOrg=await prisma.mutation.createSubOrg({
        data:{
            ...subOrgOne.input,
            org:{
                connect:{
                    id:orgOne.organization.id
                }
            },
            
        }
    })
    //CreateSubOrg Wirh Array type
    const subOrgNamelist=["RASTRIYA","PRANTIYA","KSHETRIYA","PARGANA"]
    let createSubOrgArray=[]
    subOrgNamelist.forEach(async (item)=>{
        const subOrgInput=subOrgArr(item)
        subOrgInput.subOrg=await prisma.mutation.createSubOrg({
        data:{
            ...subOrgInput.input,
            org:{
                connect:{
                    id:orgOne.organization.id
                }
            },
            
        }
    })
    console.log(" subOrgInput.subOrg", subOrgInput.subOrg)
    createSubOrgArray.push( subOrgInput.subOrg)


    })
    //create Group 
    const groupNameList=["EDUCATION", "AGRICULTURE", "BUSINESS", "GOVT", "SPORTS", "HOUSEHOLD", "MAHASABHA" ,"POLITICS"]
    let createGroupList=[]
    groupNameList.forEach(async (grpName)=>{
        const groupInput=getGroupInput(grpName)
        groupOne.group=await prisma.mutation.createGroup({
            data:groupInput.input
        })
        createGroupList.push(groupOne.group)
    })
    groupOne.group=await prisma.mutation.createGroup({
        data:groupOne.input
    })
    groupTwo.group=await prisma.mutation.createGroup({
        data:groupTwo.input
    })
   
    const userNameList=[
        {"firstname":"super","lastname":"admin", "email":"superadmin@zb.com","password":"hkak1234"},
        {"firstname":"org","lastname":"admin", "email":"orgadmin@a.com","password":"welcome123"},
        {"firstname":"suborg","lastname":"admin", "email":"suborgadmin@a.com","password":"welcome123"},
        {"firstname":"group","lastname":"admin", "email":"groupadmin@a.com","password":"welcome123"},
        {"firstname":"subgroup","lastname":"admin", "email":"subgroupadmin@a.com","password":"welcome123"},
        {"firstname":"public","lastname":"admin", "email":"publicadmin@a.com","password":"welcome123"}
        ]
    
    userNameList.forEach(async (userVariableData, index)=>{
        const userInput=getUserInput(userVariableData.firstname,userVariableData.lastname,userVariableData.email,userVariableData.password)
        console.log("userInput",userInput)
        userOne.user = await prisma.mutation.createUser({
        data: {
            ...userInput.input,
            org:{
                connect:{
                    id:orgOne.organization.id
                }
            },
            subOrgs:{
                connect: {
                    id: subOrgOne.subOrg.id,
                }
            }
        }
    })
    
    userNameList[index]['userid']=userOne.user.id
    console.log("Created USer List ==>\n",userNameList[index])
    })
   
    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: {
            ...userOne.input,
            org:{
                connect:{
                    id:orgOne.organization.id
                }
            },
            subOrgs:{
                connect: {
                    id: subOrgOne.subOrg.id,
                }
            }
        }
    })
    
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)
 //Create Role
 userNameList.forEach(async (userData)=>{
     let roleName=''
     let  rolelevel=''
     console.log("userData.firstname", userData.firstname,"USERDATA", userData.userid)
     switch(userData.firstname){
         case 'super':
            roleName='SUPERADMIN'
            rolelevel='GLOBALORG'
            console.log("Create Role super Admin")
            break;
        case 'org':
            roleName='ORGADMIN'
            rolelevel='ORG'
            console.log("Create Role org Admin")
            break;
        case 'suborg':
            roleName='SUBORGADMIN'
            rolelevel='SUBORG'
            console.log("Create Role suborg Admin")
            break;
        case 'group':
            roleName='GROUPADMIN'
            rolelevel='GROUP'
            console.log("Create Role group Admin")
            break;
        case 'subgroup':
            roleName='SUBGROUPADMIN'
            rolelevel='SUBGROUP'
            console.log("Create Role subgroup Admin")
            break;
     }
     const roleinput=getRoleInput(roleName,rolelevel);
     roleOne.role= await prisma.mutation.createRole({

        data:{
            ...roleinput.input,
            userid:{
                connect:{
                    id:userData.userid
                }
            },
            
        }
    })

 })
    roleOne.role= await prisma.mutation.createRole({

        data:{
            ...roleOne.input,
            userid:{
                connect:{
                    id:userOne.user.id
                }
            },
            
        }
    })

    roleTwo.role= await prisma.mutation.createRole({
  
        data:{
            ...roleTwo.input,
            userid:{
                connect:{
                    id:userOne.user.id
                }
            },
            
        }
    })

    //create UserRole
    // userGroupOne.userRole= await prisma.mutation.createUserRole({
    //     data:{
    //         group:{
    //         connect:{
    //             id:groupOne.group.id
    //         }
    //     },
    //         role:{
    //         connect:{
    //             id:roleOne.role.id
    //         }
    //     },
    //         user:{
    //         connect:{
    //             id:userOne.user.id
    //         }
    //     }
    //     }

    // })
    //create GroupRole

}


export { seedOrgDatabase as default,orgOne,subOrgOne,
    groupOne,groupTwo,roleOne,roleTwo, userOne}