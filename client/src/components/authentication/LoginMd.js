import './Login.css'
import React, { useState } from "react";
import { Redirect } from 'react-router'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Auth from '../../modules/Auth';
import Register from './Register';
import Constants from "../../flux/constants"
import Dispatcher from "../../flux/dispatcher"

export const LOGIN_USER = gql`
    mutation LOGIN($email:String!, $password:String!){
        login(data:{email:$email,password:$password}){
            user{id firstname email}
            token,
            myAuthinfo
        }}`;
export default function LoginMd() {

    const [userLogin] = useMutation(LOGIN_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const[register, setRegister]=useState(false);
    const[compType,setCompType]=useState("login")
    const handleRegister=(event)=>{
        event.preventDefault();
        console.log("Register component")
        setRegister(true)
        setCompType("register")
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password=event.target.password.value
        userLogin({ variables: { email,password } }).then((res)=>{
            const token=res.data.login.token
            console.log("Auth Data",JSON.stringify(res.data))
            const authdata =res.data.login.myAuthinfo
            console.log(authdata)
            const myauthdata=JSON.parse(res.data.login.myAuthinfo)
            console.log("myauthdata",myauthdata)
            const roleVal=myauthdata['roleAndGroup'][0]['role']
            console.log("MY ROLE ,",roleVal)
            switch(roleVal.rolename){
                case Constants.EDUCATION_ROLE_SUPERADMIN:
                    Dispatcher.dispatch({
                        actionType: Constants.EDUCATION_ROLE_SUPERADMIN,
                        payload:"THis is simply hardcoded from Harish"
                      });
                      break;
                case Constants.EDUCATION_ROLE_ADMIN:
                Dispatcher.dispatch({
                    actionType: Constants.EDUCATION_ROLE_ADMIN,
                    payload:"THis is simply hardcoded from Harish"
                    });
                    break;
                case Constants.EDUCATION_ROLE_TEACHER:
                    Dispatcher.dispatch({
                        actionType: Constants.EDUCATION_ROLE_TEACHER,
                        payload:"THis is simply hardcoded from Harish"
                        });
                        break;
                case Constants.EDUCATION_ROLE_PARENT:
                Dispatcher.dispatch({
                    actionType: Constants.EDUCATION_ROLE_PARENT,
                    payload:"THis is simply hardcoded from Harish"
                    });
                    break;
            }
           /**
            *  
            */
            Auth.setRoles(myauthdata.roleAndGroup)
            console.log("Local Storage",token)
            localStorage.setItem('token', token);
            Auth.authenticateUser(token)
            Auth.isUserAuthenticated(true)  
            setIsAuthenticated(true)
        }).catch(err=>{
           
            console.log(err.message)
        })
        
    }
    return (
        <div>   
        {(function() {
            
            switch(compType) {
              case 'register':
                 
                 return <Redirect to="/register" />
            }
          })()}
  {isAuthenticated ? <Redirect to="/blog-overview" />: 
        <div id="login">
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" onSubmit={handleSubmit}>
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                <label htmlFor="email" className="text-info">Email:</label><br/>
                                <input type="email" name="email" id="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" name="password" id="password" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="remember-me" className="text-info">
                                <span>Remember me</span> <span>
                                <input id="remember-me" name="remember-me" type="checkbox"/></span>
                                </label><br/>
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="submit"/>
                            </div>

                            <div id="register-link" className="text-right">           
                                <a href="/register" className="text-info" onClick={handleRegister}>Register here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        }

    </div>
    )
}
