import "./login.css";
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../service/graphql/users/query/user";
export default function LoginMd(props) {
  const [userLogin] = useMutation(LOGIN_USER);

  //const handleRegister = (event) => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("email", email, "passowrd", password);
    userLogin({ variables: { email, password } })
      .then((loginResponse) => {
        console.log("loginResponse", loginResponse);
        if (
          loginResponse &&
          loginResponse.data &&
          loginResponse.data.login &&
          loginResponse.data.login.token
        ) {
          localStorage.setItem("token", loginResponse.data.login.token);
        }
      })
      .catch((error) => {
        console.log("\n Error in login ", error);
      });
  };

  return (
    <div class="container">
      <div class="logo">LOGO TBD</div>
      <div class="login-item">
        <form id="login-form" class="form form-login" onSubmit={handleSubmit}>
          <div class="form-field">
            <label class="user" for="login-username">
              <span class="hidden">Username</span>
            </label>
            <input
              id="login-username"
              type="email"
              class="form-input"
              name="email"
              placeholder="Email Id"
              required
            />
          </div>

          <div class="form-field">
            <label class="lock" for="login-password">
              <span class="hidden">Password</span>
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              class="form-input"
              placeholder="Password"
              required
            />
          </div>

          <div class="form-field">
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    </div>
  );
}
