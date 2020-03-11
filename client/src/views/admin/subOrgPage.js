import React, { useState } from "react";
import PropTypes from "prop-types";
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
import SelectComponent from "./SelectComponent";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_SUBORG ,UPDATE_SUBORG,DELETE_SUBORG} from "../mutations/org.js";
import { GET_ORGS ,GET_SUBORGS,GET_SUBORGROLES} from "../queries/getAllOrgs";
import RoleViewComponent from './RoleViewComponent'
function SubOrgs(props) {
  console.log("SUBORGS ",props.id);
  console.log("SUBORG PAGE Selected ORG ID ", props.title);
  const [subOrgCreate] = useMutation(CREATE_SUBORG);
  const [deleteSubOrg] = useMutation(DELETE_SUBORG);
  const [updateSubOrg] = useMutation(UPDATE_SUBORG);
  const [isRoleView,setIsRoleView]=useState(false);
  const [subOrgname, setSubOrgname] = useState("");
  const [selectSubOrgObj, setSelectSubOrgObj] = useState(null);
  const [suborgDescription, setSubOrgDescription] = useState("");
  const [isEdit,setIsEdit] = useState(false);
  const { loading: suborgLoading, error: suborgError, data: suborgData } = useQuery(
    GET_SUBORGS,{variables:{id:props.id}}
  );
  if (suborgError) return <p>SubOrg ERROR: {suborgError.message}</p>;
  if (suborgData === undefined) return <p>ERROR</p>;
  if (suborgLoading) {
    return <div>SUBORG Loading</div>;
  }
  const createSubOrgFunction=()=>{
     document.getElementById("subOrgNameId").value="";
    document.getElementById("subOrgdescriptionid").value="";
    const createSubORgResp = subOrgCreate({
      variables: { name: subOrgname, description: suborgDescription, org: props.id },
      refetchQueries: [{ query: GET_SUBORGS,variables: { id: props.id } }]
    })
      .then(res => {
        console.log("SubORG  CREATION DATA", res.data.createSubOrg);
      })
      .catch(err => {
        throw new Error("Error in creating SubOrg", err);
      });
  }
  const updateSubOrgFunction=()=>{
    console.log("UPdate for Suborg id ",selectSubOrgObj.id)
    updateSubOrg({
      variables: { id:selectSubOrgObj.id,name: subOrgname, description: suborgDescription },
      refetchQueries: [{ query: GET_SUBORGS,variables: { id: props.id } }]
    })
      .then(res => {
        console.log("SubORG  CREATION DATA", res.data.createSubOrg);
      })
      .catch(err => {
        throw new Error("Error in creating SubOrg", err);
      });
  }
  const addSubOrgHandel = e => {
    isEdit?updateSubOrgFunction():createSubOrgFunction()
   
  };

  const editSubOrg=(suborg)=>{
    console.log("SUBORG for EDIT",suborg)
    document.getElementById("subOrgNameId").value=suborg.name;
    document.getElementById("subOrgdescriptionid").value=suborg.description;
    setSelectSubOrgObj(suborg)
    setIsEdit(true)
  }
  const deleteSubOrgOperation=(suborg)=>{
       deleteSubOrg({
      variables: { id: suborg.id},
      refetchQueries: [{ query: GET_SUBORGS,variables: { id: props.id } }]
    }).then(res => {
        console.log("ORG  DeleteResponse", res);
      })
      .catch(err => {
        throw new Error("Error in Deleting SubOrg",err);
      });
  }
  const addSubOrgRole =(suborg)=>{
    console.log("Add SUBORG ROLE for suborg ",suborg)
        setSelectSubOrgObj(suborg)
        setIsRoleView(true);
  }
  return (
     <Row>
      <Col>
    <Card small className="mb-3">
      <div>
        <h1>HCM{props.action}</h1>
      </div>
      
      <CardHeader className="border-bottom">
        <h6 className="m-0">{props.title}</h6>
      </CardHeader>

      <CardBody className="p-0">
        <ListGroup flush>
          <input
            name="subOrgNameId"
            id="subOrgNameId"
            type="text"
            placeholder="Enter SubOrgName"
            onChange={e => {
              setSubOrgname(e.target.value);
            }}
          />
          <input
            name="subOrgdescriptionid"
            id="subOrgdescriptionid"
            type="text"
            placeholder="Enter Description"
            onChange={e => {
              setSubOrgDescription(e.target.value);
            }}
          />

          <ListGroupItem className="d-flex px-3 border-0">
            <Button
              outline
              theme="accent"
              size="sm"
              onClick={(e) => {
                addSubOrgHandel(e)
              }}
            >
              <i className="material-icons">save</i> SaveSubOrg
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
                <h6 className="m-0">SubOrg View</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        SubOrganizatioin Id
                      </th>
                      <th scope="col" className="border-0">
                        SubOrganization Name
                      </th>
                      <th scope="col" className="border-0">
                        SubOrg Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {suborgData.suborgsoforg.map(suborg=>{

                    return (
                      <tr key={suborg.id}>
                    <td >{suborg.id}</td>
                    <td >{suborg.name}</td>  
                    <td >{suborg.description}</td> 
                    <td>
                      <div onClick={
                          ()=>{addSubOrgRole(suborg)}}>
                          <a className="material-icons" href="#">
                            group_add
                          </a><a href="#"> SubOrgRole</a>
                      </div>
                    </td>
                    <td>
                          <div onClick={()=>{
                                   editSubOrg(suborg)
                                }}>
                              <a className="material-icons ml-5" href="#">
                                edit
                              </a>
                          </div>
                      </td>  
                    <td> 
                        <div onClick={()=>{
                           deleteSubOrgOperation(suborg)
                          }}>
                           <a className="material-icons ml-5" href="#" >
                              delete
                            </a>
                            
                        </div>
                    </td>
                    </tr>
                    )
            })}
                  </tbody>
                </table>
              </CardBody>
            </Container>
          </CardBody>
        </Card>
      </Col>

          <Row>
      {isRoleView?
      <RoleViewComponent  id={selectSubOrgObj.id} rolelevel="SUBORG" roleQuery={GET_SUBORGROLES}/>
      :"NoRole"}
      </Row>
    </Row>
  );
}

SubOrgs.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SubOrgs.defaultProps = {
  title: "ActionsHCM"
};
function handleClick(e) {
  e.preventDefault();
  console.log("SidebarActions The link was clicked.");
}
export default SubOrgs;
