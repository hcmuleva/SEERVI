import React, { useState } from "react";

import {
  Row,Col,Container,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";
import SelectComponent from "./SelectComponent";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ORGS, GET_SUBORGS } from "../queries/getAllOrgs";
import { GET_AllUsers } from "../queries/allUser";
import AddUserByAdmin from './AddUserByAdmin'
export default function UserManagedByAdmin() {
  const [orgSelected, setOrgSelected] = useState(null);
  const [selectedSubOrgObj, setSelectedSubOrgObj] = useState(null);
  const [userSelected,setUserSelected] = useState(null);
  const [isEdit, setIsEdit] =useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_AllUsers
  );

  const { loading: orgLoading, error: orgError, data: orgData } = useQuery(
    GET_ORGS
  );

  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {
    return <div>org Loading</div>;
  }
  if (userError) return <p>User ERROR: {userError.message}</p>;
  if (userData === undefined) return <p>ERROR</p>;
  if (userLoading) {
    return <div>User Loading</div>;
  }

  const sugOrgList = () => {
    if (orgSelected.suborgs) {
      return orgSelected.suborgs;
    } else {
      return [];
    }
  };
  const userSelectionHandler = (userObj)=>{
      console.log("userSelectionHandler==>",userObj)
  }
  
  return (
    <Row>
      
      <Col>
        <Card small className="mb-3">
          <CardHeader className="border-bottom">
            <h6 className="m-0">User Manage by Admin</h6>
            <Row>
              <Col>
                <SelectComponent
                  title={"ORG"}
                  listdata={orgData.allorgs}
                  setSelected={setOrgSelected}
                />
              </Col>
              <Col>
                {orgSelected ? (
                  <SelectComponent
                    title={"SubORG"}
                    listdata={sugOrgList()}
                    setSelected={setSelectedSubOrgObj}
                  />
                ) : (
                  ""
                )}
              </Col>
              <Col>
                <Button onClick={()=>{
                  setIsAdd(true)
                  setIsEdit(false)
                }}>AddUser</Button>
              </Col>
            </Row>
          </CardHeader>
          </Card>
            <Row>
           {orgSelected&&selectedSubOrgObj&&isAdd? <AddUserByAdmin org={orgSelected} suborg={selectedSubOrgObj} />:""}
           {orgSelected&&selectedSubOrgObj&&isEdit? <AddUserByAdmin org={orgSelected} suborg={selectedSubOrgObj} userObj={userSelected} />:""}
          </Row>
           <Card small className="mb-3">
          <CardBody className="p-0">
            <Container fluid className="main-content-container px-1 pb-1">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        First Name
                      </th>
                      <th scope="col" className="border-0">
                        Last Name
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                      <th scope="col" className="border-0">
                        ORG
                      </th>
                      <th scope="col" className="border-0">
                        SUBORG
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.users.map(user => {
                      return (
                        <tr key={user.id}>
                          <td
                            onClick={() => {
                              userSelectionHandler(user);
                            }}
                          >
                            {user.firstname}
                          </td>
                          <td
                            onClick={() => {
                              userSelectionHandler(user);
                            }}
                          >
                            {user.lastname}
                          </td>
                          <td
                            onClick={() => {
                              userSelectionHandler(user);
                            }}
                          >
                            {user.email}
                          </td>
                          <td
                            onClick={() => {
                              userSelectionHandler(user);
                            }}
                          >
                            {user.org.name}
                          </td>
                          <td
                            onClick={() => {
                              userSelectionHandler(user);
                            }}
                          >
                            {" "}
                            {user.org.suborgs[0].name}
                          </td>

                          <td>
                            <div
                              onClick={() => {
                                setUserSelected(user);
                                setIsAdd(false);
                                setIsEdit(true)
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
                                console.log("Delete is clicked", user.id);
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
