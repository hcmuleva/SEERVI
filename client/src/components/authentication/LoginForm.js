import React, { useState } from "react";
import { Button } from "shards-react";

export default function LoginForm(props) {
  const [userLoginFormData, setUserLoginFormData] = useState({});

  return (
    <div id="login">
      <div className="container">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form
                id="login-form"
                className="form"
                onSubmit={e => {
                  e.preventDefault();
                  props.loginUserData(userLoginFormData)
                }}
              >
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group" className="col-md-6">
                  <label htmlFor="email" className="text-info">
                    Email:
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={e => {
                      setUserLoginFormData({
                        ...userLoginFormData,
                        email: e.target.value
                      });
                    }}
                  />
                </div>
                <div className="form-group" className="col-md-6">
                  <label htmlFor="password" className="text-info col-md-6">
                    Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={e => {
                      setUserLoginFormData({
                        ...userLoginFormData,
                        password: e.target.value
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remember-me" className="text-info">
                    <span>Remember me</span> 
                    <span>
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                      />
                    </span>
                  </label>
                  <br />
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="submit"
                  />
                  &nbsp;
                  <input
                    type="submit"
                    name="register"
                    className="btn btn-success btn-md"
                    value="register"
                  />
                </div>

                <div id="register-link" className="text-right"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
