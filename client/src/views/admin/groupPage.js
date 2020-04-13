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
import{CREATE_GROUP,UPDATE_GROUP,DELETE_GROUP} from '../../graphql/mutations/group/groupmgmt'
import {GET_GROUPSOFSUBORG,GET_GROUPROLES} from '../queries/getAllOrgs'
function  Groups(props) {
    console.log("Groups props.id",props.id)
    const { loading:groupLoading, error:groupError, data:groupData } = useQuery(GET_GROUPSOFSUBORG,{variables:{id:props.id}})
    const [groupCreate] = useMutation(CREATE_GROUP);
    const [groupname,setGroupname]=useState('')
    const [groupDescription,setGroupDescription]=useState('')
    const [deleteGroup] = useMutation(DELETE_GROUP);
    const [updateGroup] = useMutation(UPDATE_GROUP);
    const [selectGroupObj, setSelectGroupObj] = useState(null);
    const [isEdit,setIsEdit] = useState(false);
    const [isRoleView,setIsRoleView] =useState(false)
   
  if (groupError) return <p>Org ERROR: {groupError.message}</p>;
  if (groupData === undefined) return <p>ERROR</p>;
  if (groupLoading) {return <div>groupData Loading</div>;}

    const createGroupFunction=()=>{
      document.getElementById("groupNameId").value="";
      document.getElementById("groupdescriptionid").value="";
      groupCreate({
          variables: { name: groupname, description: groupDescription, suborgid:props.id },
          refetchQueries: [{ query: GET_GROUPSOFSUBORG,variables: { id: props.id } }]
      })
      .then(res => {
          console.log("Group  CREATION DATA", res.data.groupCreate);
      })
      .catch(err => {
          throw new Error("Error in creating Group", err);
      });
    }
      console.log("GroupData", groupData,  " properties ", props.id)
     const updateGroupFunction=()=>{
       console.log("For UpdateselectGroupObj  ",selectGroupObj)
      const groupNameForEdit=document.getElementById("groupNameId").value;
      const groupDescriptionForEdit=document.getElementById("groupdescriptionid").value;
      console.log("groupNameForEdit",groupNameForEdit,"    groupDescriptionForEdit",groupDescriptionForEdit)
      updateGroup({
          variables: {id:selectGroupObj.id, name: groupNameForEdit, description: groupDescriptionForEdit},
          refetchQueries: [{ query: GET_GROUPSOFSUBORG,variables: { id: props.id } }]
      })
      .then(res => {
          console.log("Group  Update DATA", res.data.updateGroup);
      })
      .catch(err => {
          throw new Error("Error in Update Group", err);
      });
      document.getElementById("groupNameId").value="";
      document.getElementById("groupdescriptionid").value="";
    }
    const addGroupHandler=(e)=>{
       isEdit?updateGroupFunction():createGroupFunction()
    }
    const editGroup=(group)=>{
      console.log("group edit",group)
      document.getElementById("groupNameId").value=group.name;
      document.getElementById("groupdescriptionid").value=group.description;
      setSelectGroupObj(group)
      setIsEdit(true)
  }
  const deleteGroupOperation=(group)=>{
       deleteGroup({
      variables: { id: group.id},
      refetchQueries: [{ query: GET_GROUPSOFSUBORG,variables: { id: props.id } }]
    }).then(res => {
        console.log("Group  DeleteResponse", res);
      })
      .catch(err => {
        throw new Error("Error in Deleting Group",err);
      });
  }
    const addGroupRole=(group)=>{
      console.log("ADD GROUP ROLE",group)
      setSelectGroupObj(group)
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
                name="groupNameId"
                id="groupNameId"
                type="text"
                placeholder="Enter GroupName"
                onChange={e => {
                  setGroupname(e.target.value);
                }}
              />
              <input
                name="groupdescriptionid"
                id="groupdescriptionid"
                type="text"
                placeholder="Enter Description"
                onChange={e => {
                  setGroupDescription(e.target.value);
                }}
              />
              <ListGroupItem className="d-flex px-3 border-0">
                <Button
                  outline
                  theme="accent"
                  size="sm"
                  onClick={(e) => {
                    addGroupHandler(e)
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
                        Group Id
                      </th>
                      <th scope="col" className="border-0">
                        Group Name
                      </th>
                      <th scope="col" className="border-0">
                        Group Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {groupData.groupsOfSubOrg.map(group=>{

                    return (
                      <tr key={group.id}>
                    <td >{group.id}</td>
                    <td >{group.name}</td>  
                    <td >{group.description}</td> 
                    <td>
                      <div  className="material-icons" onClick={
                          ()=>{addGroupRole(group)}}>
                          GroupRole
                      </div>
                    </td>
                    <td>
                          <div onClick={()=>{
                                 
                                   editGroup(group)
                                }}>
                              <a className="material-icons ml-5" href="#">
                                edit
                              </a>
                          </div>
                      </td>  
                    <td> 
                        <div onClick={()=>{
                           deleteGroupOperation(group)
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
      <RoleViewComponent  id={selectGroupObj.id} rolelevel="GROUP" roleQuery={GET_GROUPROLES}/>
      :"NoRole"}
      </Row>
    </Row>
    );
  }

  Groups.propTypes = {
    /**
    * The component's title.
    */
    title: PropTypes.string
  };

  Groups.defaultProps = {
    title: "ActionsHCM"
  };
  function handleClick(e) {
    e.preventDefault();
    console.log('SidebarActions The link was clicked.');
  };
export default Groups;
