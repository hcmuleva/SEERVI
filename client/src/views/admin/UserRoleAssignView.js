import React, { useState } from "react";
import SelectComponent from "./SelectComponent";
import { GET_ORGS } from "../queries/getAllOrgs";
import {ASSIGN_BULK_ROLE_TO_USER} from '../mutations/user'
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Row, Col, Card, CardHeader, CardBody,Button } from "shards-react";
import SubGroupPage from "./subGroupPage";
import { styled } from '@material-ui/core/styles';

import RoleCard from './RoleCard'
import UserCardView from './UserCardView'
import { style } from '@material-ui/system';
import { compose, spacing, palette } from '@material-ui/system';

import Tree from './REACTIVETABLE'
const Box = styled('div')(
  compose(
    spacing,
    palette,
  ),
);


export default function UserRoleAssignView() {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedSubOrg, setSelectedSubOrg] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [compType,setCompType]= useState('');
  const [bulkRoleAssign] = useMutation(ASSIGN_BULK_ROLE_TO_USER);
  const [roleSelected, setRoleSelected]=useState([])
  const [selectedUserObj, setSelectedUserObj] = useState({
    firstname: "Harish",
    lastname: "Muleva",
    email: "Harish@gmail.com",
    id: "SDFDSFDFDSFDFD"
  });
  const { loading: orgLoading, error: orgError, data: orgData } = useQuery(
    GET_ORGS
  );

  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {
    return <div>ORG Loading</div>;
  }
  const orgSelection=(data)=>{
    setSelectedOrg(data)
    setCompType("ORG")
  }
  const suborgSelection=(data)=>{
    setSelectedSubOrg(data)
    setCompType("SUBORG")
  }
  const groupSelection=(data)=>{
    setSelectedGroup(data)
    setCompType("GROUP")
  }
  const subGroupSelection=(data)=>{
    setSelectedSubGroup(data)
    setCompType("SUBGROUP")
  }
  const roleSelect=(roleData)=>{
    let temparray=[]
    temparray.push(roleData)
    const contArr=temparray.concat(roleSelected)
    var mergedArray = roleSelected.concat(temparray.filter((item) => roleSelected.indexOf(item) < 0))
    setRoleSelected(mergedArray)
  }
 const createMemmbership= ()=>{

                console.log("hcmBelow Listed roles",roleSelected," will and user will be saved",selectedUserObj )
                bulkRoleAssign({
      variables: { userid: selectedUserObj.id, description: "BULKASSIGNEMNT",status:"ACTIVE", role: JSON.stringify(roleSelected) },
 
    })
          console.log("SUCCESSFULY CREATED BULK ASSIGNMENT")
            }
  const getComponent=()=>{
    switch (compType) {
      case "ORG":
          return (<RoleCard id={selectedOrg.id} rolelevel="ORG" roleSelect={roleSelect}/>)  
      case "SUBORG":
          return (<RoleCard id={selectedSubOrg.id} rolelevel="SUBORG" roleSelect={roleSelect}/>)  
      case "GROUP":
          return (<RoleCard id={selectedGroup.id} rolelevel="GROUP" roleSelect={roleSelect}/>)  
      case "SUBGROUP":
          return (<RoleCard id={selectedSubGroup.id} rolelevel="SUBGROUP" roleSelect={roleSelect}/>)  
      default:
        return (<div>Please Select One of Component Type</div>);
    }
  }
  const setUserSelectedObj= (userRow)=>{
    console.log("Selected Row ",userRow)
    setSelectedUserObj(userRow)
  }
  return (
    <div>
      <Row>
        <Col>
          <SelectComponent
            title={"ORG"}
            listdata={orgData.allorgs}
            setSelected={orgSelection}
          />
        </Col>
        <Col>
          {selectedOrg ? (
            <SelectComponent
              title={"SubORG"}
              listdata={selectedOrg.suborgs}
              setSelected={suborgSelection}
            />
          ) : (
            ""
          )}
        </Col>
        <Col>
          {selectedSubOrg ? (
            <SelectComponent
              title={"Group"}
              listdata={selectedSubOrg.userGroups}
              setSelected={groupSelection}
            />
          ) : (
            ""
          )}
        </Col>
        <Col>
          {selectedGroup ? (
            <SelectComponent
              title={"SubGroup"}
              listdata={selectedGroup.subgroups}
              setSelected={subGroupSelection}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        {/**selectedSubGroup?<SubGroupPage id={selectedGroup.id} title={"SUBGroup Create"}/>:""**/}
      </Row>
      <Row>
        <Col>
         {selectedOrg? <UserCardView title="Harih Testing" userLevel={"ORG"} id={selectedOrg.id} userSelectRow={setSelectedUserObj}/>:""}
        </Col>
        <Col>
          <Card small className="mb-3">
            <CardHeader className="border-bottom">
              <h6 className="m-0">
               <Box color="white" bgcolor="palevioletred" p={1}><Row><Col>{selectedUserObj.firstname}</Col><Col>{selectedUserObj.lastname}</Col><Col>{selectedUserObj.email}</Col></Row></Box>
                
              </h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              {selectedOrg?getComponent():"Select ORG"}
            </CardBody>
             <CardHeader className="border-bottom">
           
                <CardBody className="p-1 pb-3">
                  <Row>
                  {roleSelected.map((role)=>{
                    return (<Box color="white" bgcolor="palevioletred" p={1}><Col>{role.name}</Col></Box>
                    )
                  })}
                  </Row>
                </CardBody>
            
            </CardHeader>
            <Button outline theme="accent" size="sm" onClick={createMemmbership}>
            <i className="material-icons">save</i> AssignRole
          </Button>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
}
