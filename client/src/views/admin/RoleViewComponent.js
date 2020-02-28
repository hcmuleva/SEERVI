import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";
import {
  GET_ORGS,
  GET_ORGROLES,
  GET_SUBORGROLES,
  GET_GROUPROLES,
  GET_SUBGROUPROLES
} from "../queries/getAllOrgs";
import {CREATE_ORGROLE,CREATE_SUBORGROLE,CREATE_GROUPROLE,CREATE_SUBGROUPROLE,UPDATE_ROLE,DELETE_ROLE} from '../mutations/org'

export default function RoleViewComponent(props) {
  const selectRoleQuery = () => {
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
      console.log("selectRoleQuery ",selectRoleQuery)
    return roleLiistValue;

    console.log("ROLELIST ", roleList);
  };

  console.log("RoleViewComponent props", props);
  const query = props.roleQuery;
  const [roleList, roleLiistValue] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [isRoleEdit,setIsRoleEdit] =useState(false)
  const [orgRoleCreate] = useMutation(CREATE_ORGROLE);
  const [suborgRoleCreate] = useMutation(CREATE_SUBORGROLE);
  const [groupRoleCreate] = useMutation(CREATE_GROUPROLE);
  const [subgroupRoleCreate] = useMutation(CREATE_SUBGROUPROLE);
  const [deleteRole] = useMutation(DELETE_ROLE);
  const [orgRoleUpdate]=useMutation(UPDATE_ROLE);
  const [selectedRole,setSelectedRole]= useState(null)
  
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
  console.log("rolesData", rolesData);
  const getRoleList = () => {
    let roleLiistValue;
    if (rolesData) {
      console.log("rolesData ", props.rolelevel);
      switch (props.rolelevel) {
        case "ORG":
          roleLiistValue = rolesData.orgRoles;
          break;
        case "SUBORG":
          roleLiistValue = rolesData.subOrgRoles;
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

    console.log("ROLELIST ", roleList);
  };

  const editRoleOrg = role => {
    console.log("EDIT ROLE ",role)
    document.getElementById("roleCreateId").value=role.name;
    document.getElementById("roleCreatedescriptionid").value=role.description;
    setRoleName(role.name)
    setRoleDescription(role.description)
    setSelectedRole(role)
    
  };
  const deleteRoleOperation = role => {
    console.log("DELETE ROLE OPERATION NEED TO IMEPLMENT", role);
    deleteRole({
      variables: { id: role.id},
      refetchQueries: [{ query: selectRoleQuery(),variables: { id: props.id } }]
    }).then(res => {
        console.log("Role  DeleteResponse", res);
      })
      .catch(err => {
        throw new Error("Error in Deleting Role",err);
      });
    
  };
  const updateRole=(role)=>{
    console.log("Update Role",roleName, "  Descr", roleDescription, "role::", role)
    console.log("UPDATE Role")
    orgRoleUpdate({
      variables: { name: roleName, description: roleDescription, id: selectedRole.id },
      refetchQueries: [{ query: selectRoleQuery(),variables: { id: props.id } }]
    }).then(res => {console.log("UPDATED  ROLE",res)}).catch(err => {throw new Error("Error in Update ROLE", err); });
        
    
      document.getElementById("roleCreateId").value=""
      document.getElementById("roleCreatedescriptionid").value=""
  }

   const createRole=(role)=>{
    
    switch (props.rolelevel) {
        case "ORG":
          orgRoleCreate({
      variables: { name: roleName, description: roleDescription, org: props.id },
      refetchQueries: [{ query: selectRoleQuery(),variables: { id: props.id } }]
    }).then(res => {console.log("CREATED ORG ROLE",res)}).catch(err => {throw new Error("Error in creating ORG ROLE", err); });
          break;
        case "SUBORG":
          suborgRoleCreate({
      variables: { name: roleName, description: roleDescription, suborg: props.id },
      refetchQueries: [{ query: selectRoleQuery(),variables: { id: props.id } }]
    }).then(res => {console.log("CREATED SUBORG ROLE",res)}).catch(err => {throw new Error("Error in creating SUBORG  ROLE", err); });
          break;
        case "GROUP":
          groupRoleCreate({
      variables: { name: roleName, description: roleDescription, group: props.id },
      refetchQueries: [{ query: selectRoleQuery(),variables: { id: props.id } }]
    }).then(res => {console.log("CREATED GROUPROLE",res)}).catch(err => {throw new Error("Error in creating group ROLE", err); });
          break;
        case "SUBGROUP":
          subgroupRoleCreate({
      variables: { name: roleName, description: roleDescription, subgroup: props.id },
      refetchQueries: [{ query: selectRoleQuery(),variables: { id: props.id } }]
    }).then(res => {console.log("CREATED SUBGROUPROLE",res)}).catch(err => {throw new Error("Error in creating SUBGROUP ROLE", err); });
          break;
       
      }
    
      document.getElementById("roleCreateId").value=""
      document.getElementById("roleCreatedescriptionid").value=""
    
  }
  const addRoleHandeler =(e,role)=>{
    console.log("isRoleEdit",isRoleEdit)
    isRoleEdit?updateRole(e,role):createRole(e,role)
  }
  return (
    <Row>
     <Col>
    <Card small className="mb-3">
      <div>
        <h1>{props.action}</h1>
      </div>
      
      <CardHeader className="border-bottom">
        <h6 className="m-0">{props.rolelevel} Role Create</h6>
      </CardHeader>

      <CardBody className="p-0">
        <ListGroup flush>
          <input
            name="roleCreateId"
            id="roleCreateId"
            type="text"
            placeholder="Enter RoleName"
            onChange={e => {
              setRoleName(e.target.value);
            }}
          />
          <input
            name="roleCreatedescriptionid"
            id="roleCreatedescriptionid"
            type="text"
            placeholder="Enter Role Description"
            onChange={e => {
              setRoleDescription(e.target.value);
            }}
          />

          <ListGroupItem className="d-flex px-3 border-0">
            <Button
              outline
              theme="accent"
              size="sm"
              onClick={(e) => {
                addRoleHandeler(e)
              }}
            >
              <i className="material-icons">save</i> SaveRole
            </Button>
            
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
    </Col>
      <Col>
        <Card small className="mb-3">
          <CardBody className="p-0">
            <Container fluid className="main-content-container px-1 pb-1">
              <CardHeader className="border-bottom">
                <h6 className="m-0">ROLE View</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Role Id
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
                        <tr key={role.id}>
                          <td>{role.id}</td>
                          <td>{role.name}</td>
                          <td>{role.description}</td>
                          <td>
                            <div
                              onClick={() => {
                                console.log("EDIT role is clicked", role.id);
                                editRoleOrg(role);
                                 setIsRoleEdit(true)
                              }}
                            >
                              <a className="material-icons ml-5" href="#">
                                edit
                              </a>
                            </div>
                          </td>
                          <td>
                            <div
                              onClick={() => {
                                deleteRoleOperation(role);
                              }}
                            >
                              <a className="material-icons ml-5" href="#">
                                delete
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Container>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
