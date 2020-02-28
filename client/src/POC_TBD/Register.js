import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';

import{CREATE_USER} from '../views/mutations/user.js'
import Swal from 'sweetalert2'
import ScrollableTabsButtonForce from './StudentSubscription'
import CheckboxGroup from 'react-checkbox-group'
import CheckBox from './CheckBox'
import content from "./content"
import StudentSubscriptionModal from './StudentSubscriptionModal'
export default function Register() {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null)
    const [rePassword, setRePassword] = useState(null)
    const [registerUser]= useMutation(CREATE_USER)
    const [fruits, setFruits] = useState(['apple', 'watermelon'])
    const [listForSubscription, setListForSubscription] = useState(content['KG'])
    const [studytype, setStudyType]=useState('KG')
    const [userType, setUserType]=useState({
        STUDENT: true,
        CONTRIBUTOR: false,
        BUSINESSMAN: false,
        FARMER: false,
    })
        const studentOptions=(name)=>{
            return (`<h3>${name}<input type="checkbox" id=${name}  /></h3>`)
        }
        const handleUserButton=(name)=>{
            console.log(name)
            setUserType({
                STUDENT: false,
                CONTRIBUTOR: false,
                BUSINESSMAN: false,
                FARMER: false,
            })
            switch(name){
                case "STUDENT":
                    setUserType({STUDENT: true})
                break;
                case "CONTRIBUTOR":
                    setUserType({CONTRIBUTOR: true})
                break;
                case "BUSINESSMAN":
                    setUserType({BUSINESSMAN: true})
                break;
                case "FARMER":
                    setUserType({FARMER: true})
                break;
                default:
                
            }
            console.log("USER STATUS", userType.STUDENT)
        }

  const handleCheckChieldElement = (event) => {
      console.log("EVENT CLICKED ", event.target.value)
      return true
    //let fruites = this.state.fruites
    // fruites.forEach(fruite => {
    //    if (fruite.value === event.target.value)
    //       fruite.isChecked =  event.target.checked
    // })
    // this.setState({fruites: fruites})
  }

   return (
    <div id="login-box">   
  <div className="left">
    <input type="text" name="firstname" placeholder="Fist Name" onChange={(e)=>setFirstName(e.target.value)}/>
    <input type="text" name="lastname" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
    <input type="text" name="email" placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)}/>
    <input type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
    <input type="password" name="password2" placeholder="Retype password" onChange={(e)=>setRePassword(e.target.value)}/>  
    <input type="submit" name="signup_submit" value="Sign me up"  onClick={
        ()=>{
            if(password!=rePassword){
                Swal.fire({
                    title: 'Error!',
                    text: 'Password Mismatch, please re-enter password',
                    icon: 'error'
                })
            }else {
                console.log("BEFORE REGISTER")
                registerUser({ variables: { firstname,lastname,email,password } }).then((createUserResponse)=>{
                    console.log("createUserResponse",createUserResponse)
                })
                console.log("After REgisterData for User registration", "firstname",firstname, "lastname",lastname, "email",email, "password",password )
            }
        }
        }/>
  </div>
  
  <div className="right">
    <span className="usertype-signin message ">Select Below option <br />Are You</span>
    <StudentSubscriptionModal/>
    <button className="usertype-signin student" onClick={(e)=>{handleUserButton("STUDENT")}}>Student?</button>
    {userType.STUDENT?<div>
    <div onChange={(e)=>{
        console.log("Study type SELECTED ", e.target.value)
        setStudyType(e.target.value)

        }}>
        <input type="radio" value="KG" name="studylevel" checked={studytype === 'KG'}/> KG
        <input type="radio" value="PRIIMARY" name="studylevel" checked={studytype === 'PRIIMARY'}/> PRIIMARY
        <input type="radio" value="MIDDLE" name="studylevel" checked={studytype === 'MIDDLE' }/> MIDDLE
        <input type="radio" value="HIGHSCHOOL" name="studylevel" checked={studytype === 'HIGHSCHOOL' }/> HIGHSCHOOL
        <input type="radio" value="COLLEGE" name="studylevel" checked={studytype === 'COLLEGE'}/> COLLEGE
      </div>
      <br/>
    </div>:""}

        {
          listForSubscription.map((item, index) => {
            return (<CheckBox key={index} handleCheckChieldElement={(e)=>handleCheckChieldElement}  {...item} ukey={index} />)
          })
        }
       
    <button className="usertype-signin contributor" onClick={(e)=>{handleUserButton("CONTRIBUTOR")}}>Contributor?</button>
    {userType.CONTRIBUTOR?<div>HelloCONTRIBUTOR</div>:""}
    <button className="usertype-signin twitter" onClick={(e)=>{handleUserButton("BUSINESSMAN")}}>Businessman?</button>
    {userType.BUSINESSMAN?<div>HelloBUSINESSMAN</div>:""}
    <button className="usertype-signin google" onClick={(e)=>{handleUserButton("FARMER")}}>Farmer?</button>
    {userType.FARMER?<div>HelloFARMER</div>:""}

  </div>
   
  <div className="or">AND</div>
</div>
    )
}

{/**
1. User Register Form
    User should be able to submit and on successfully able to create user will throw new page which is User Type 
    else user should be remain on Register page.
Action1: User able to create and get response.
Pending user action for user type selection. 

2. User should be able to select User Type : Student, Contributor ,Business, Agriculture, And Other
    This is card view where user will have card and click on this will return option.
3. On User selected type then
    Default (Student registration), other cliick return message, it will show proper content in next Sprint.
    Student Registeration meaning user will assign to Academic and Education group and subgroup.
    Also user will be allowed to select list of subjects.
    On completion of this step user will redirect to main app with Group/Role and subscriptions array. 
    User 
 */}