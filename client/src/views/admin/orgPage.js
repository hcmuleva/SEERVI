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
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_ORG,UPDATE_ORG,DELETE_ORG } from "../mutations/org.js";

import {GET_ORGS,GET_ORGROLES } from "../queries/getAllOrgs";
import RoleViewComponent from './RoleViewComponent'
function Orgs(props) {
  const [orgname, setOrgname] = useState("");
  const [isEdit,setIsEdit]=useState(false)
  const[selectedOrg,setSelectedOrg]=useState('')
  const [orgDescription, setOrgDescription] = useState("");
  const [orgCreate] = useMutation(CREATE_ORG);
  const [deleteOrg]=useMutation(DELETE_ORG); 
  const [updateOrg]=useMutation(UPDATE_ORG);
  const [rolelist,setRolelist]=useState(null);
  const [orgSelected, setOrgSelected]=useState(null)
  const [isRoleView,setIsRoleView]=useState(false);
  const { loading:orgLoading, error:orgError, data:orgData } = useQuery(GET_ORGS)

  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {return <div>ORG Loading</div>;}
  let orgid=null
  if(orgSelected){
    orgid=orgSelected.id
  }
   const { loading:subgroupLoading, error:subgroupError, data:subgroupData } = useQuery(GET_ORGROLES,{variables:{id:"ck6yektdm0iu50784wgl42co4"}})
   
  if (subgroupError) return <p>SUBGROUP ERROR: {subgroupError.message}</p>;
  if (subgroupData === undefined) return <p>ERROR</p>;
  if (subgroupLoading) {return <div>groupData Loading</div>;}
  console.log("subgroupData ",subgroupData)
{/**
  const { loading:rolesLoading, error:rolesError, data:rolesData } =  useQuery(GET_ORGROLES,{variables:{id:"ck6yektdm0iu50784wgl42co4"}})
    if (rolesError) return <p>rolesError ERROR: {rolesError.message}</p>;
    if(rolesData === undefined) return <p>ERROR</p>;
    if (rolesLoading) {return <div>rolesLoading </div>;}
    console.log("rolesData",rolesData)
     */}
  const createOrgFunction =()=>{
       orgCreate({
      variables: { name: orgname, description: orgDescription },
      refetchQueries: [{ query: GET_ORGS }]
    })
      .then(res => {
        console.log("ORG  CREATION DATA", res);
      })
      .catch(err => {
        throw new Error("Error in creating Org");
      });
      document.getElementById("orgnameid").value="";
      document.getElementById("descriptionid").value="";
  }
  const updateOrgFunction =()=>{
    const nameVal=document.getElementById("orgnameid").value;
    const descrionVal=document.getElementById("descriptionid").value;
       console.log("Update Name ",nameVal)
       updateOrg({
      variables: { id:selectedOrg.id, name: nameVal, description: descrionVal },
      refetchQueries: [{ query: GET_ORGS }]
    })
      .then(res => {
        console.log("ORG  CREATION DATA", res);
      })
      .catch(err => {
        throw new Error("Error in creating Org");
      });
      document.getElementById("orgnameid").value="";
      document.getElementById("descriptionid").value="";
  }
  
  const addOrgRole=(org)=>{
    setOrgSelected(org)
    setIsRoleView(true);
  }
  const addOrgHandel = e => {
    isEdit?updateOrgFunction():createOrgFunction()
  };

  const editOrg=(org)=>{
    console.log("Org For Edit",org)
    document.getElementById("orgnameid").value=org.name;
    document.getElementById("descriptionid").value=org.description;

    setSelectedOrg(org)
    setIsEdit(true)
  }
  
  const deleteOrgOperation=(org)=>{
       deleteOrg({
      variables: { id: org.id},
      refetchQueries: [{ query: GET_ORGS }]
    }).then(res => {
        console.log("ORG  DeleteResponse", res);
      })
      .catch(err => {
        throw new Error("Error in Deleting Org",err);
      });
  }


  return (
    <Row>
      <Col>
        <Card small className="mb-3">
          <div>
            <h1>{props.action}</h1>
          </div>
          <CardHeader className="border-bottom">
            <h6 className="m-0">{props.title}</h6>
          </CardHeader>

          <CardBody className="p-0">
            <ListGroup flush>
              <input
                name="orgname"
                id="orgnameid"
                type="text"
                placeholder="Enter OrgName"
                onChange={e => {
                  setOrgname(e.target.value);
                }}
              />
              <input
                name="description"
                id="descriptionid"
                type="text"
                placeholder="Enter Description"
                onChange={e => {
                  setOrgDescription(e.target.value);
                }}
              />
              <ListGroupItem className="d-flex px-3 border-0">
                <Button
                  outline
                  theme="accent"
                  size="sm"
                  onClick={(e) => {
                    addOrgHandel(e)
                  }}
                >
                  <i className="material-icons">save</i> Save Org
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
                <h6 className="m-0">Org View</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Organizatioin Id
                      </th>
                      <th scope="col" className="border-0">
                        Organization Name
                      </th>
                      <th scope="col" className="border-0">
                        Org Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {orgData.allorgs.map(org=>{

                    return (
                      <tr key={org.id}>
                    <td >{org.id}</td>
                    <td >{org.name}</td>  
                    <td >{org.description}</td> 
                    <td><div onClick={()=>{
                      addOrgRole(org)
                    }}><a className="material-icons" href="#">
group_add
</a><a href="#"> OrgRole</a></div></td>
                    <td>
                          <div onClick={()=>{
                                  console.log("EDIT is clicked", org.id)
                                   editOrg(org)
                                }}>
                              <a className="material-icons ml-5" href="#">
                                edit
                              </a>
                          </div>
                      </td>  
                    <td> 
                        <div onClick={()=>{
                           deleteOrgOperation(org)
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
      {/** Roles View iin Table view for Org Admin */}
      <Row>
      {isRoleView?
      <RoleViewComponent  id={orgSelected.id} rolelevel="ORG"/>
      :"NoRole"}
      </Row>
    </Row>
  );
}

Orgs.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Orgs.defaultProps = {
  title: "ActionsHCM"
};
function handleClick(e) {
  e.preventDefault();
  console.log("SidebarActions The link was clicked.");
}
export default Orgs;
