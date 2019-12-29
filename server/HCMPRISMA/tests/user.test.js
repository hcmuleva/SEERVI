import 'cross-fetch/polyfill'
import ApolloBoost,{gql} from 'apollo-boost'
const client =new ApolloBoost({
    uri:'http://localhost:4000'
})
const create_org=(orgName)=>{
    const createOrg=`
       mutation{
   createOrganization(data:{
     name:${orgName}
   }){
     name
     id
   }
       }
   `
   console.log("Before return",createOrg)
   return createOrg
}
  

test('jsonGenerator',()=>{
    console.log(create_org("Harish"))
    const orgs=[{orgName:"SEERVI"}, {orgName:"SCTC"}]
    const subOrgs=[{suborgName:"KARI"},{suborgName:"BANGALORE"}]
    const education_roles=[{"roleName":"TEACHER"},{"roleName":"PARENT"},{"roleName":"STUDENT"},{"roleName":"CREATOR"},{"roleName":"ADMIN"}]
    const sport_roles=[{"roleName":"CAPTAIN"},{"roleName":"VICECAPTAIN"},{"roleName":"COACH"},{"roleName":"TRAINER"},{"roleName":"PLAYER"}]
    const groups=[{"name":"EDUCATION"},{"name":"SPORTS"},{"name":"SOCIAL"},{"name":"NEWS"},{"name":"COMPETION"},{"name":"TUTION"}]
    
    groups.map((group)=>{

        if(group.name==="EDUCATION"){
            education_roles.map((role)=>{
                console.log("RoleName",role.roleName , " and group ", group.name)
                const user={firstName:role.roleName, lastName:"EDUCATION", email:(role.roleName).toLowerCase+"@a.com"}

            }) 
        }else if(group.name==="SPORTS"){
            sport_roles.map((role)=>{
                console.log("RoleName",role.roleName , " and group ", group.name)
        
            })  
        }
    })
     
})
// test('Create ORG',async ()=>{
//    const createOrg=gql`
//       mutation{
//   createOrganization(data:{
//     name:"SEEDORG"
//   }){
//     name
//     id
//   }
// }  
//    `
//    const response =await client.mutate({
//        mutation:createOrg
//    })
//    console.log("RESPONSE ",response)
// })