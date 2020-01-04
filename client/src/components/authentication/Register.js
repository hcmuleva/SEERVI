import React from 'react'
import './Register.css';
export default function Register() {
    return (
        <div id="login-box">
        
  <div className="left">
    <h1>Register Page</h1>
    
    <input type="text" name="username" placeholder="Username" />
    <input type="text" name="email" placeholder="E-mail" />
    <input type="password" name="password" placeholder="Password" />
    <input type="password" name="password2" placeholder="Retype password" />
    
    <input type="submit" name="signup_submit" value="Sign me up" />
  </div>
  
  <div className="right">
    <span className="loginwith">Sign in with<br />social network</span>
    
    <button className="social-signin facebook">Log in with facebook</button>
    <button className="social-signin twitter">Log in with Twitter</button>
    <button className="social-signin google">Log in with Google+</button>
  </div>
  <div className="or">OR</div>
</div>
    )
}
