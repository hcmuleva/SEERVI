import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';
import {
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ButtonToolbar,
    ButtonGroup,
    Button,
    Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  
  FormCheckbox
  
} from "shards-react";
import User from '../user/User'
export const CREATE_USER = gql`
    mutation CREATEORGANIZATION($name:String!, $description:String!){
        createOrganization(data:{name:$name,description:$description}){
        id
        name
        description
  }
    }`;
export const GET_USER = gql`
query ORGS{
    orgs{
    id
    name
    description
  }
}`;
export default function (props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [roleStatus,setRoleStatus]=useState([])
    const changeRole=(role)=>{

       switch(role){
        
           case "admin":
               console.log("Admin clicked")
               roleStatus[0]=!roleStatus[0]
               
               break;
            case "teacher":
                console.log("Teacher clicked")
                roleStatus[1]=!roleStatus[1]
                
               break;
            case "student":
                console.log("student clicked")
                roleStatus[2]=!roleStatus[2]
                break;
            case "parent":
                console.log("Parent clicked")
                roleStatus[3]=!roleStatus[3]
                break;
            case "contributor":
                console.log("Contributor clicked")
                roleStatus[4]=!roleStatus[4]
                break;
            case "superadmin":
                console.log("SUPERADMIN clicked")
                roleStatus[5]=!roleStatus[5]
                break;
            case "principal":
                console.log("Principal clicked")
                roleStatus[6]=!roleStatus[6]
                break;
       }
       console.log(roleStatus)
       setRoleStatus(roleStatus)
    }
    const handleUserCreate=(e)=>{
        e.preventDefault()
        console.log("Submit",e)
        let myroles=[]
        roleStatus.map((status,index)=>{
            switch(index){
                case 0:
                    console.log("Admin", status)
                    myroles.push("ADMIN")
                    break;
                case 1:
                    console.log("Teacher", status)
                    myroles.push("TEACHER")
                    break;
                case 2:
                    console.log("Student", status)
                    myroles.push("STUDENT")
                    break;
                case 3:
                    console.log("Parent", status)
                    myroles.push("PARENT")
                    break;
                case 4:
                    console.log("Contributor", status)
                    myroles.push("CONTRIBUTOR")
                    break;
                case 5:
                    console.log("SUPERADMIN", status)
                    myroles.push("SUPERADMIN")
                    break;
                case 6:
                    console.log("PRINCIPAL", status)
                    myroles.push("PRINCIPAL")
                    break;
            }
        })
        console.log("User name", userName, " Password", password, "Org ",props.userData.name,"Id ",props.userData.id , " and roles ", myroles)
    }
    return (
        <div>
            <h1>User Mgmt</h1>
            <h2>name={props.userData.name}</h2>
            <h2>ID={props.userData.id}</h2>
            <form>
                <div >
                
                    
                    <input type="email" className="form-control" aria-label="Text input with checkbox" placeholder="userName" value={userName} onChange={e => setUserName(e.target.value)} />
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                           
                        </div>
                    </div>
                    <input type="password" className="form-control" aria-label="Text input with checkbox" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <input type="password" className="form-control" aria-label="Text input with checkbox" placeholder="confirm password" />
                    <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">User Roles</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="px-3 pb-2">
        <input
        type="checkbox"
        name="admin" checked={roleStatus[0]}  onChange={e=>changeRole("admin")}/>Admin
        <input
        type="checkbox"
        name="teacher" checked={roleStatus[1]}  onChange={e=>changeRole("teacher")}/>Teacher
        
        <input
        type="checkbox"
        name="student" checked={roleStatus[2]}  onChange={e=>changeRole("student")}/>Student
        
        <input
        type="checkbox"
        name="parent" checked={roleStatus[3]}  onChange={e=>changeRole("parent")}/>Parent
        
        <input
        type="checkbox"
        name="contributor" checked={roleStatus[4]}  onChange={e=>changeRole("contributor")}/>Contributor
        <input
        type="checkbox"
        name="contributor" checked={roleStatus[5]}  onChange={e=>changeRole("superadmin")}/>SUPERADMIN
         
        <input
        type="checkbox"
        name="contributor" checked={roleStatus[6]}  onChange={e=>changeRole("principal")}/>PRINCIPAL
         
        

                </ListGroupItem>

        <ListGroupItem className="d-flex px-3">
          <InputGroup className="ml-auto">
            <FormInput placeholder="New category" />
            <InputGroupAddon type="append">
              <Button theme="white" className="px-2">
                <i className="material-icons">add</i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
                </div>
                <button type="submit" onClick={handleUserCreate}>Submit</button>
            </form>
        </div>
    )
}
