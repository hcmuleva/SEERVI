import React, {useState} from 'react'
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";
import RoleViewComponent from './RoleViewComponent'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import{CREATE_SUBGROUP,UPDATE_SUBGROUP,DELETE_SUBGROUP} from '../mutations/org.js'
import {GET_SUBGROUPSOFGROUP,GET_SUBGROUPROLES} from '../queries/getAllOrgs'
function  SubGroupPage(props) {
    console.log("SubGroup props.id",props.id)
    const { loading:subgroupLoading, error:subgroupError, data:subgroupData } = useQuery(GET_SUBGROUPSOFGROUP,{variables:{id:props.id}})
    const [subgroupCreate] = useMutation(CREATE_SUBGROUP);
    const [subgroupname,setSubGroupname]=useState('')
    const [subgroupDescription,setSubGroupDescription]=useState('')
    const [deleteSubGroup] = useMutation(DELETE_SUBGROUP);
    const [updateSubGroup] = useMutation(UPDATE_SUBGROUP);
    const [selectSubGroupObj, setSelectSubGroupObj] = useState(null);
    const [isEdit,setIsEdit] = useState(false);
    const [isRoleView,setIsRoleView] =useState(false)

  if (subgroupError) return <p>SUBGROUP ERROR: {subgroupError.message}</p>;
  if (subgroupData === undefined) return <p>ERROR</p>;
  if (subgroupLoading) {return <div>groupData Loading</div>;}

    const createSubGroupFunction=()=>{
      document.getElementById("subgroupNameId").value="";
      document.getElementById("subgroupdescriptionid").value="";
      subgroupCreate({
          variables: { name: subgroupname, description: subgroupDescription, groupid:props.id },
          refetchQueries: [{ query: GET_SUBGROUPSOFGROUP,variables: { id: props.id } }]
      })
      .then(res => {
          console.log("SUBGroup  CREATION DATA", res.data);
      })
      .catch(err => {
          throw new Error("Error in creating SUBGroup", err);
      });
    }
     const updateSubGroupFunction=()=>{
      const subgroupNameForEdit=document.getElementById("subgroupNameId").value;
      const subgroupDescriptionForEdit=document.getElementById("subgroupdescriptionid").value;
      console.log("subgroupNameForEdit",subgroupNameForEdit,"    subgroupDescriptionForEdit",subgroupDescriptionForEdit)
      updateSubGroup({
          variables: {id:selectSubGroupObj.id, name: subgroupNameForEdit, description: subgroupDescriptionForEdit},
          refetchQueries: [{ query: GET_SUBGROUPSOFGROUP,variables: { id: props.id } }]
      })
      .then(res => {
          console.log("SubGroup  Update DATA", res.data.updateSubGroup);
      })
      .catch(err => {
          throw new Error("Error in Update SubGroup", err);
      });
      document.getElementById("subgroupNameId").value="";
      document.getElementById("subgroupdescriptionid").value="";
    }
    const addSubGroupHandler=(e)=>{
       isEdit?updateSubGroupFunction():createSubGroupFunction()
    }
    const editGroup=(subgroup)=>{
      console.log("Subgroup edit",subgroup)
      document.getElementById("subgroupNameId").value=subgroup.name;
      document.getElementById("subgroupdescriptionid").value=subgroup.description;
      setSelectSubGroupObj(subgroup)
      setIsEdit(true)
  }
  const deleteSubGroupOperation=(subgroup)=>{
       deleteSubGroup({
      variables: { id: subgroup.id},
      refetchQueries: [{ query: GET_SUBGROUPSOFGROUP,variables: { id: props.id } }]
    }).then(res => {
        console.log("subgroup  DeleteResponse", res);
      })
      .catch(err => {
        throw new Error("Error in Deleting subgroup",err);
      });
  }
  const addSubGroupRole =(subgroup)=>{
      console.log("SubGroup Role ",subgroup)
      setSelectSubGroupObj(subgroup)
      setIsRoleView(true)
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
                name="subgroupNameId"
                id="subgroupNameId"
                type="text"
                placeholder="Enter GroupName"
                onChange={e => {
                  setSubGroupname(e.target.value);
                }}
              />
              <input
                name="subgroupdescriptionid"
                id="subgroupdescriptionid"
                type="text"
                placeholder="Enter Description"
                onChange={e => {
                  setSubGroupDescription(e.target.value);
                }}
              />
              <ListGroupItem className="d-flex px-3 border-0">
                <Button
                  outline
                  theme="accent"
                  size="sm"
                  onClick={(e) => {
                    addSubGroupHandler(e)
                  }}
                >
                  <i className="material-icons">save</i> Save Group
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
                        SubGroup Id
                      </th>
                      <th scope="col" className="border-0">
                        SubGroup Name
                      </th>
                      <th scope="col" className="border-0">
                        SubGroup Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {subgroupData.subgroupsOfGroup.map(subgroup=>{

                    return (
                      <tr key={subgroup.id}>
                    <td >{subgroup.id}</td>
                    <td >{subgroup.name}</td>  
                    <td >{subgroup.description}</td> 
                    <td>
                      <div className="material-icons" onClick={
                          ()=>{addSubGroupRole(subgroup)}}>
                         
                      </div>
                    </td>
                    <td>
                          <div className="material-icons ml-5" onClick={()=>{
                                 
                                   editGroup(subgroup)
                                }}>
                             
                                edit
                              
                          </div>
                      </td>  
                    <td> 
                        <div onClick={()=>{
                           deleteSubGroupOperation(subgroup)
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
      <RoleViewComponent  id={selectSubGroupObj.id} rolelevel="SUBGROUP" roleQuery={GET_SUBGROUPROLES}/>
      :"NoRole"}
      </Row>
    </Row>
    );
  }

  SubGroupPage.propTypes = {
    /**
    * The component's title.
    */
    title: PropTypes.string
  };

  SubGroupPage.defaultProps = {
    title: "ActionsHCM"
  };
  function handleClick(e) {
    e.preventDefault();
    console.log('SidebarActions The link was clicked.');
  };
export default SubGroupPage;
