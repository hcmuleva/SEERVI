import React from "react";
import { Row, Col, Card, CardHeader, CardBody ,Button} from "shards-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {GET_AllUsers,GET_ORGBYID,GET_SUBORGBYID} from '../queries/allUser'
export default function UserCardView(props) {
  const selectRoleQuery = ()=>{
      const userLevel=props.userLevel
      
      switch (userLevel) {
          case "ORG":
              return GET_ORGBYID
              break;
          case "SUBORG":
              return GET_SUBORGBYID
              break;
      
          default:
              return GET_AllUsers;
              break;
      }
  }
   const {
    loading: userLoading,
    error: userError,
    data: userData
  } = useQuery(selectRoleQuery(), { variables: { id: props.id } });
  if (userError) return <p>userError ERROR: {userError.message}</p>;
  if (userData === undefined) return <p>ERROR</p>;
  if (userLoading) {
    return <div>userLoading </div>;
  }
    console.log("USER CARD userData", userData)
    let userDataList=[]
    if(userData) userDataList=userData.orgById.author

    const getRoles =(usr)=>{
        if(usr.myRoles){
            return usr.myRoles.map((roleObj)=>{
                return (
                    <Button key={roleObj.id}
                  outline
                  theme="accent"
                  size="sm"
                  
                  
                    
                    ><i className="material-icons">remove</i>
                    {roleObj.role.name}
                    </Button>)
            })
        }
        console.log(usr)
    }
  return (
    <div>
      <Card small className="mb-3">
        <div>
          <h6>{props.title}</h6>
        </div>
        <CardHeader className="border-bottom">
          <h6 className="m-0"></h6>
        </CardHeader>
        <CardBody>

           

            <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      USER ID
                    </th>
                     <th scope="col" className="border-0">
                      USER First Name
                    </th>
                     <th scope="col" className="border-0">
                      USER  LastName
                    </th>
                    <th scope="col" className="border-0">
                      USER  Email
                    </th>
                    <th scope="col" className="border-0">Roles</th>
                  </tr>
                </thead>
                <tbody>
                {userDataList.map(usr => {
                      return (
                        <tr key={usr.id} onClick={()=>{
                            props.userSelectRow(usr)
                        }}>
                          <td>{usr.id}</td>
                          <td>{usr.firstname}</td>
                          <td>{usr.lastname}</td>
                           <td>{usr.email}</td>
                           <td>{getRoles(usr)}</td>
                         </tr>
                      )})
                }
                

             
                </tbody>
              </table>
        </CardBody>
      </Card>
    </div>
  );
}
