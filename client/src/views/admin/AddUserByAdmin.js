import React ,{useState}from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormFeedback,
  FormInput,
  FormSelect,
  Button
} from "shards-react";
import { useQuery ,useMutation} from '@apollo/react-hooks';
import {GET_AllUsers} from '../queries/allUser'
import {CREATE_USER_ADMIN,UPDATE_USER_ADMIN} from '../mutations/user'
import Swal from 'sweetalert2'
export default function AddUserByAdmin(props) {
    console.log("PROPS of AddUserByAdmin ",props)
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errors,setErrors]=useState([])
    const [createUserByAdmin]=useMutation(CREATE_USER_ADMIN);
    const [updateUserByAdmin] =useMutation(UPDATE_USER_ADMIN);
    const [confirmPassword,setConfirmPassword]=useState('')
    const editUser=(userObj)=>{
      console.log("EditUser",userObj)
      document.getElementById("userfirstnameByAdminId").value=userObj.firstname;
      document.getElementById("userlastnameByAdminId").value=userObj.lastname;
      document.getElementById("userEmailByAdminId").value=userObj.email;
      document.getElementById("userPasswordByAdminId").value='';
      document.getElementById("userConfirmPasswordByAdminId").value='';
      

    }
    const updateUser =(userObj)=>{
      updateUserByAdmin({ variables: {id:userObj.id, firstname,lastname,email,password},refetchQueries: [{ query: GET_AllUsers }] }).then((updateUserResp)=>{
          console.log("Update UserResponse",updateUserResp)
      })
      document.getElementById("userfirstnameByAdminId").value='';
      document.getElementById("userlastnameByAdminId").value='';
      document.getElementById("userEmailByAdminId").value='';
      document.getElementById("userPasswordByAdminId").value='';
      document.getElementById("userConfirmPasswordByAdminId").value='';
    }
    const createUserHandler=()=>{
      if(!firstname|| !lastname){
                Swal.fire({
                    title: 'Error!',
                    text: 'first Name  or Last Can not be empty',
                    icon: 'error'
                })
               }
              if(!email){
                Swal.fire({
                    title: 'Error!',
                    text: 'Email field Can not be empty',
                    icon: 'error'
                })
              }
              if(password!=confirmPassword){
                Swal.fire({
                    title: 'Error!',
                    text: 'Password Mismatch, please re-enter password',
                    icon: 'error'
                })
              }
            else {
                createUserByAdmin({ variables: { firstname,lastname,email,password,org:props.org.id,suborg:props.suborg.id },refetchQueries: [{ query: GET_AllUsers }] }).then((createUserResponseByAdmin)=>{
                    console.log("createUserResponse",createUserResponseByAdmin)
                })
                document.getElementById("userfirstnameByAdminId").value='';
                document.getElementById("userlastnameByAdminId").value='';
                document.getElementById("userEmailByAdminId").value='';
                document.getElementById("userPasswordByAdminId").value='';
                document.getElementById("userConfirmPasswordByAdminId").value='';
   
            }
    }

    return (

    
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0"><strong>{props.org.name}</strong>/<strong>{props.suborg.name}</strong></h6>
    </CardHeader>
    {props.userObj?
    <CardBody className="p-0">
    
      <ListGroup flush>
          <FormInput name="userfirstnameByAdmin" id="userfirstnameByAdminId" type="text" placeholder={props.userObj.firstname}   onChange={(e) => {setFirstname(e.target.value)}}/>
          
          <FormInput name="userlastnameByAdmin" id="userlastnameByAdminId" type="text" placeholder={props.userObj.lastname} required onChange={(e) => {setLastname(e.target.value)}}/>

          <FormInput name="userEmailByAdmin" id="userEmailByAdminId" type="text" placeholder={props.userObj.email} required onChange={(e) => {setEmail(e.target.value)}}/>

          <FormInput name="userPasswordByAdmin" id="userPasswordByAdminId" type="text" placeholder="Enter User Password" required onChange={(e) => {setPassword(e.target.value)}}/>

          <FormInput name="userConfirmPasswordByAdmin" id="userConfirmPasswordByAdminId" type="text" placeholder="ConfirmPassword" required onChange={(e) => {setConfirmPassword(e.target.value)}}/>


        <ListGroupItem className="d-flex px-3 border-0">
          <Button outline theme="accent" size="sm" onClick={
            ()=>{updateUser(props.userObj) }

              }>
            <i className="material-icons">save</i> Save
          </Button>
        </ListGroupItem>
      </ListGroup>
    </CardBody>:
    
    <CardBody className="p-0">
    
      <ListGroup flush>
          <FormInput name="userfirstnameByAdmin" id="userfirstnameByAdminId" type="text" placeholder="Enter User First Name"  onChange={(e) => {setFirstname(e.target.value)}}/>
          
          <FormInput name="userlastnameByAdmin" id="userlastnameByAdminId" type="text" placeholder="Enter User Last Name" required onChange={(e) => {setLastname(e.target.value)}}/>

          <FormInput name="userEmailByAdmin" id="userEmailByAdminId" type="text" placeholder="Enter User EmailID" required onChange={(e) => {setEmail(e.target.value)}}/>

          <FormInput name="userPasswordByAdmin" id="userPasswordByAdminId" type="text" placeholder="Enter User Password" required onChange={(e) => {setPassword(e.target.value)}}/>

          <FormInput name="userConfirmPasswordByAdmin" id="userConfirmPasswordByAdminId" type="text" placeholder="ConfirmPassword" required onChange={(e) => {setConfirmPassword(e.target.value)}}/>


        <ListGroupItem className="d-flex px-3 border-0">
          <Button outline theme="accent" size="sm" onClick={
            ()=>{createUserHandler() }

              }>
            <i className="material-icons">save</i> Save
          </Button>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
    }
  </Card>
);
    
}
