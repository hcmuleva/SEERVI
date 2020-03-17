import './Login.css'
import React, { useState } from "react";
import { Redirect } from 'react-router'
import { useMutation,useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Register from './RegisterForm'
import newsregistration from "../../data/newsregistration";
import { createBrowserHistory } from "history";
import { Button} from "shards-react";
import RoleNavBarController from "./RoleNavBarController" 
export const LOGIN_USER = gql`
    mutation LOGIN($email:String!, $password:String!){
        login(data:{email:$email,password:$password}){
            user{id firstname email}
            token
        }}`;
export default function LoginMd() {
    
const history = createBrowserHistory();

    const [userLogin] = useMutation(LOGIN_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const[register, setRegister]=useState(false);
    const[compType,setCompType]=useState("login")
    const handleRegister=(event)=>{
        history.push("/register")
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password=event.target.password.value
        console.log("email",email, "passowrd", password)
        userLogin({ variables: { email,password } }).then((loginResponse)=>{
            if(loginResponse&&loginResponse.data&&loginResponse.data.login&&loginResponse.data.login.token){
                localStorage.setItem('token', loginResponse.data.login.token);
                 setIsAuthenticated(true)
            }
        }).catch(
            (error)=>{
                
                console.log("\n Error in login ", error)
                
            }
        );
        
      
    }
    
    return (
        <div>   
    
  {isAuthenticated ? <RoleNavBarController/>: 
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
                                
                                <Button className="btn btn-info btn-md" ><a href="/register"  onClick={handleRegister}>Register here</a></Button>
                            </div>
                            
                            <div id="register-link" className="text-right">   
                                {register?<Register/>:<div></div>}        
                                
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
