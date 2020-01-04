import React, { useState } from "react";
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';
import { Redirect,Router } from 'react-router-dom';
import Auth from '../../modules/Auth'
import { Store } from "../../flux";
export const LOGIN_USER = gql`
   mutation LOGIN($email:String!, $password:String!){
  login(data:{
    email:$email,
    password:$password
  }){
    user{
      id
      name
      email
    }
    token
  }
}
`;

let loginStatus=false;

export default function Login() {

    let input;
    const [userLogin, { data }] = useMutation(LOGIN_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authValue=()=>{
        const isLoggedIn=localStorage.get('isLoggedIn')
        const token=localStorage.get('token')
        
        console.log("token",token)
        if(isLoggedIn|| token){
            setIsAuthenticated(true)
            Auth.authenticateUser(token)
            Auth.isUserAuthenticated(true)  
            
        }else {
            setIsAuthenticated(false)
        }
        
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password=event.target.password.value
        userLogin({ variables: { email,password } }).then((res)=>{
            const myauthdata=JSON.parse(res.data.login.myAuthinfo)
            Auth.setRoles(myauthdata.roleAndGroup)
            console.log("Local Storage",res.data.login.token)
            localStorage.setItem('token', res.data.login.token);
            localStorage.setItem('isLoggedIn', true);
            setIsAuthenticated(true)
            Auth.authenticateUser(res.data.login.token)
        }).catch(err=>{
            setIsAuthenticated(false)

            console.log(err.message)
        })

        
    }

    return (
        <div>
        {/*{ isAuthenticated
          ? <Redirect to="blog-overview"/>
          :  <section className="hero is-success is-fullheight">
          <div className="hero-body">
          
              <div className="container has-text-centered">

                  <div className="column is-4 is-offset-4">
                      <h3 className="title has-text-black">Login</h3>
                      <hr className="login-hr"/>
                      <p className="subtitle has-text-black">Please login to proceed.</p>
                      <div className="box">
                          <figure className="hcmavatar">
                              <img src="https://placehold.it/128x128"/>
                          </figure>
                          <form   onSubmit={handleSubmit}>
                              <div className="field">
                                  <div className="control">
                                      <input className="input is-large" id="email" name="email" type="email" placeholder="Your Email" autoFocus="" />
                                  </div>
                              </div>
  
                              <div className="field">
                                  <div className="control">
                                      <input className="input is-large" id="password" name="password" type="password" placeholder="Your Password" />
                                  </div>
                              </div>
                              <div className="field">
                                  <label className="checkbox">
                    <input type="checkbox"/>
                    Remember me
                  </label>
                              </div>
                              <button className="button is-block is-info is-large is-fullwidth">Login <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                          </form>
                      </div>
                      <p className="has-text-grey">
                          <a href="../">Sign Up</a> &nbsp;·&nbsp;
                          <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                          <a href="../">Need Help?</a>
                      </p>
                  </div>
              </div>
          </div>
          
      </section>
        }*/}
      </div>
      
        
    );
}