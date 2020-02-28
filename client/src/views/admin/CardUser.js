/* eslint jsx-a11y/anchor-is-valid: 0 */

import React ,{useState} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";
import SelectComponent from './SelectComponent'
import Box from '@material-ui/core/Box'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import {GET_ORGS,GET_GROUPS} from '../queries/getAllOrgs'
import {GET_AllUsers} from '../queries/allUser'

import ADDUSER from './AddUserByAdmin'

const CardUser = (props) => {
  const [orgSelected, setOrgSelected]=useState('')
  
  const [userForOperation,setUserForOperation]=useState('')
  const [selectedOrgObj,setSelectedOrgObj]= useState(null)
  const [selectedSubOrgObj,setSelectedSubOrgObj]= useState(null)
  const [subOrgList,setSubOrgList]=useState([])
  const [isAddUserEnabled, setIsAddUserEnabled]=useState(false)
  const [isAddUser,setIsAddUser]=useState(false)
  const [compName,setCompName]=useState('')
  const [comp,setComp]=useState(null)
  const { loading:userLoading, error:userError, data:userData } = useQuery(GET_AllUsers)
  const { loading:orgLoading, error:orgError, data:orgData } = useQuery(GET_ORGS)
  const { loading:groupLoading, error:groupError, data:groupData } = useQuery(GET_GROUPS)
  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {return <div>org Loading</div>;}
  if (userError) return <p>User ERROR: {userError.message}</p>;
  if (userData === undefined) return <p>ERROR</p>;
  if (userLoading) {return <div>User Loading</div>;}
  
  const selectOrgObj=(obj)=>{
    console.log("RECIVED ORG OBJ ", obj)
    setSelectedOrgObj(obj)
  }
  const getSubOrgList=()=>{
    if(selectedOrgObj.suborgs){
      return selectedOrgObj.suborgs
    }else {
      return subOrgList;
    }
  }
  const setSubOrg=(obj)=>{
    setIsAddUserEnabled(true)
    setSelectedSubOrgObj(obj)
  }
  const userSelectionHandler=(user)=>{
    console.log("USER Selected ", user.firstname)
    setComponent("USERROLE")
  }
  const isRowSelected=()=>{
    const selectedUser=userForOperation?true:false
    return selectedUser
  }
  const setComponent=(compName)=>{
    switch (compName) {
      case "ADDUSER":
          setComp(<ADDUSER org={selectedOrgObj} suborg={selectedSubOrgObj}/>)
        break;
      case "USERROLE":
        setComp (<Card small className="mb-2">
          
          <CardHeader className="border-bottom">
            <h6 className="m-0">Need to Move thiis to component Selected User</h6>
            <Row>
            </Row>
          </CardHeader>

          <CardBody className="p-0">

          </CardBody>
        </Card>)
      default:

        return ""
        break;
    }
  }
  return (
    <Row>

   <Col>
  <Card small className="mb-3">
    <div><h1>{props.action}</h1></div>
      <CardHeader className="border-bottom">
        <h6 className="m-0">{props.title}</h6>
        <Row>
        <Col><SelectComponent title={"ORG"} listdata={orgData.allorgs} setSelected={selectOrgObj}/></Col>
       <Col>{selectedOrgObj?<SelectComponent title={"SubORG"} listdata={getSubOrgList()} setSelected={setSubOrg}/>:""}</Col>
        <Col>{isAddUserEnabled?<Button onClick={()=>{
          console.log("Add User Clicked", selectedOrgObj , "AND SUBORG SELECTED\n",selectedSubOrgObj)
          setComponent("ADDUSER")
          
          }}>Add User</Button>:""}</Col>
          </Row>
      </CardHeader>

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
                  
                  {userData.users.map(user=>{

                    return (
                      <tr key={user.id}>
                    <td onClick={()=>{userSelectionHandler(user)}}>{user.firstname}</td>  
                    <td onClick={()=>{userSelectionHandler(user)}}>{user.lastname}</td> 
                    <td onClick={()=>{userSelectionHandler(user)}}>{user.email}</td>
                    <td onClick={()=>{userSelectionHandler(user)}}>{user.org.name}</td>  
                    <td onClick={()=>{userSelectionHandler(user)}}> {user.org.suborgs[0].name}</td>
                    
                    <td>
                          <div onClick={()=>{
                                  console.log("EDIT is clicked", user.id)
                                   setUserForOperation(user.id)
                                }}>
                              <a className="material-icons ml-5" href="#">
                                edit
                              </a>
                          </div>
                      </td>  
                    <td> 
                        <div onClick={()=>{console.log("Delete is clicked", user.id)
                           setUserForOperation(user.id)
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
     
      <Col>
      {comp?comp:""}
      </Col>
      
     </Row>
  );
  }
    
    

  CardUser.propTypes = {
    /**
    * The component's title.
    */
    title: PropTypes.string
  };

  CardUser.defaultProps = {
    title: "Actions"
  };
  function handleClick(e) {
    e.preventDefault();
    console.log('CardUser The link was clicked.');
};
export default CardUser;
