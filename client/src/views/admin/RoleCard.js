import React from 'react'
import { Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {
  GET_ORGROLES,
  GET_SUBORGROLES,
  GET_GROUPROLES,
  GET_SUBGROUPROLES
} from "../queries/getAllOrgs";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function RoleCard(props) {
    const selectRoleQuery = () => {
    let roleLiistValue;
    switch (props.rolelevel) {
      case "ORG":
        return GET_ORGROLES;
        break;
      case "SUBORG":
        return GET_SUBORGROLES;
        break;
      case "GROUP":
        return GET_GROUPROLES;
        break;
      case "SUBGROUP":
        return GET_SUBGROUPROLES;
        break;
    }
    return roleLiistValue;

    
  };

const getRoleList = () => {
    let roleLiistValue;
    if (rolesData) {
      console.log("rolesData ", props.rolelevel);
      switch (props.rolelevel) {
        case "ORG":
          roleLiistValue = rolesData.orgRoles;
          break;
        case "SUBORG":
          roleLiistValue = rolesData.suborgRoles;
          break;
        case "GROUP":
          roleLiistValue = rolesData.groupRoles;
          break;
        case "SUBGROUP":
          roleLiistValue = rolesData.subGroupRoles;
          break;

        default:
          roleLiistValue = rolesData.orgRoles;
          break;
      }
    }
    return roleLiistValue;

  };
  const {
    loading: rolesLoading,
    error: rolesError,
    data: rolesData
  } = useQuery(selectRoleQuery(), { variables: { id: props.id } });
  if (rolesError) return <p>rolesError ERROR: {rolesError.message}</p>;
  if (rolesData === undefined) return <p>ERROR</p>;
  if (rolesLoading) {
    return <div>rolesLoading </div>;
  }
    return (
        <div>
            <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Role ID
                    </th>
                     <th scope="col" className="border-0">
                      Role Name
                    </th>
                     <th scope="col" className="border-0">
                      Role Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                {getRoleList().map(role => {
                      return (
                        <tr key={role.id} onClick={()=>{
                            props.roleSelect(role)
                        }}>
                          <td>{role.id}</td>
                          <td>{role.name}</td>
                          <td>{role.description}</td>
                         </tr>
                      )})
                }
                

             
                </tbody>
              </table>
        </div>
    )
}
