async function createOrgRole(parent, args, { prisma, request }, info) {
  console.log("REquest recived for CreateORG ROLE ",args)
  const orgRoleExists = await prisma.exists.Role({ name: args.data.name,org: {id: args.data.org}})
    if (orgRoleExists) {
        throw new Error('Role Already Exist')
    }    
  return await prisma.mutation.createRole({
    data :{
      name: args.data.name,
      description:args.data.description,
      org: {connect:{ id:args.data.org}}}
    },
    info
  );
}
async function createSubOrgRole(parent, args, { prisma, request }, info) {
   const suborgRoleExists = await prisma.exists.Role({ name: args.data.name,suborg: {id: args.data.suborg}})
    if (suborgRoleExists) {
        throw new Error('Role Already Exist')
    }  
  return await prisma.mutation.createRole({
    data :{
      name: args.data.name,
      description:args.data.description,
      suborg: {connect:{ id:args.data.suborg}}}
    },
    info
  );
}
async function createGroupRole(parent, args, { prisma, request }, info) {
  const groupRoleExists = await prisma.exists.Role({ name: args.data.name,group: {id: args.data.group}})
    if (groupRoleExists) {
        throw new Error('Role Already Exist')
    }    
  return await prisma.mutation.createRole({
    data :{
      name: args.data.name,
      description:args.data.description,
      group: {connect:{ id:args.data.group}}}
    },
    info
  );
}
async function createSubGroupRole(parent, args, { prisma, request }, info) {
  console.log("\n******\n","REQUEST for createSubGroupRole recieved ",args, "\n******\n")
   const subGroupRoleExists = await prisma.exists.Role({ name: args.data.name,subgroup: {id: args.data.subgroup}})
    if (subGroupRoleExists) {
        throw new Error('Role Already Exist')
    } 
  return await prisma.mutation.createRole({
    data :{
      name: args.data.name,
      description:args.data.description,
      subgroup: {connect:{ id:args.data.subgroup}}}
    },
    info
  );
}
async function updateRole(parent, args, { prisma, request }, info) {
   const roleExists = await prisma.exists.Role({ id: args.data.id})
    if (!roleExists) {
        throw new Error('Unable to update Role')
    } 
    return await prisma.mutation.updateRole({
        where: {
            id: args.id
        },
        data: args.data
    }, info)
  
}
async function deleteRole(parent, args, { prisma, request }, info) {
   const roleExists = await prisma.exists.Role({ id: args.id})
    if (!roleExists) {
        throw new Error('Unable to Delete Role')
    } 
    return await prisma.mutation.deleteRole({
        where: {
            id: args.id
        }
        
    }, info)
  
}
export {createOrgRole,createSubOrgRole, createGroupRole,createSubGroupRole,updateRole,deleteRole };
