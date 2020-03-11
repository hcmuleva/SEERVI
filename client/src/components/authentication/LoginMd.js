import './Login.css'
import React, { useState } from "react";
import { Redirect } from 'react-router'
import { useMutation,useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Auth from '../../modules/Auth';
import Register from './RegisterForm'
import Constants from "../../flux/constants"
import Dispatcher from "../../flux/dispatcher"
import { Store } from "../../flux";
import publicnavitems from "../../data/public-nav-items";
import rolebased_routes from "../../data/rolebased_routes"
import defaultnav from "../../data/defaultnav"
import newsregistration from "../../data/newsregistration";
import { createBrowserHistory } from "history";
import {GET_MYROLES,GET_SUBSCRIPTION} from '../../views/queries/allUser'
import { Button} from "shards-react";
 

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
                console.log("loginResponse.token ", loginResponse.data.login.token)
                history.push("/registernews")
                localStorage.setItem('token', loginResponse.data.login.token);
                 setIsAuthenticated(true)
                 const mynavItems=[...publicnavitems(), ...newsregistration()]
                 Store.setSideBarItems(mynavItems);
                 Dispatcher.dispatch({actionType: Constants.EDUCATION_ROLE_SUPERADMIN,payload:"THis is simply hardcoded from Harish" });
            }
        });
        
      
    }
    const getRoleItem =(role)=>{
        return rolebased_routes().filter(item=>{
            if(item.title === role) return item
        })
    }
    const myRole=[{name:"ORGADMIN"},{name:"TEACHER"},{name:"PARENT"}]
    const getRoleNavItemList = (myRole)=>{
        let roleNavItems=[] 
        myRole.map(role=>{
            switch (role.name) {
                case "SUPERADMIN":
                    roleNavItems.push(...getRoleItem('superadmin'))
                    break;
                case "ORGADMIN":
                    roleNavItems.push(...getRoleItem('orgadmin'))
                    break;
                case "GROUPADMIN":
                    roleNavItems.push(...getRoleItem('groupadmin'))
                    break;
                case "SUBGROUPADMIN":
                    roleNavItems.push(...getRoleItem('subgroupadmin'))
                    break;
                case "PRINCIPAL":
                    roleNavItems.push(...getRoleItem('principal'))
                    break;
                case "TEACHER":
                    roleNavItems.push(...getRoleItem('teacher'))
                    break; 
                case "STUDENT":
                    roleNavItems.push(...getRoleItem('student'))
                    break;
                case "PARENT":
                    roleNavItems.push(...getRoleItem('parent'))
                    break;         
                default:
                    break;
            }
        })
        roleNavItems.push(...defaultnav())
        return roleNavItems;
    }
    const { loading:userRoleLoading, error:userRoleError, data:userRoleData } = useQuery(GET_MYROLES)
    if (userRoleError) return <p>User ERROR: {userRoleError.message}</p>;
    if (userRoleData === undefined) return <p>User RoleERROR</p>;
    if (userRoleLoading) {return <div>userRoleData Loading</div>;}
    const myRecievedRoles= ()=>{
        let myMetaData={}
        const myrolelist=userRoleData.myRoles.map(myrole=>{
            console.log("MYROLE ",myrole.role)
            
            if(myrole.role.org){
                myMetaData["org"]=myrole.role.org
                console.log("ORG ID ", myrole.role.org.id, " ORG NAME ", myrole.role.org.name)
                if(myrole.role.org.suborgs){
                    myMetaData["suborgs"]=myrole.role.org.suborgs
                    myrole.role.org.suborgs.map(sorg=>{
                        console.log("SUBORG ",sorg, "ID ",sorg.id, "  name ",sorg.name)
                        //console.log("SUBORG ID ", myrole.role.org.sorg.id, " suborg NAME ", myrole.role.org.sorg.name)
                    })
                    
                }
            }
            console.log("BEFORE STORAGE ",myMetaData)
            localStorage.setItem('metadata',JSON.stringify(myMetaData))
            console.log("After STORAGE ",localStorage.getItem('metadata'))
            return myrole.role
            })
        console.log(myrolelist)

    }
    if(userRoleData){
         myRecievedRoles()
         const roleItems=getRoleNavItemList(myRole)
         Store.setSideBarItems(roleItems);
         Dispatcher.dispatch({actionType: Constants.EDUCATION_ROLE_SUPERADMIN,payload:"THis is simply hardcoded from Harish" });
    }
    const getRoleBaseComponent= ()=>{
        if(userRoleData){

        }
    }
    return (
        <div>   
    
  {isAuthenticated ? <Redirect to="/userpage"/>: 
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
