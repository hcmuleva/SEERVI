import "./login.css";
import React, { useState } from "react";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import profile from "./arpitaPhoto.png";

import "./LoginCard.scss";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../service/graphql/users/query/user";
export default function LoginMd(props) {
  const [userLogin] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedOne, setCheckedOne] = useState(false);
  const updateOne = () => setCheckedOne(!checkedOne);
  const myprofileurl = localStorage.getItem("profileurl");
  const profileurl = myprofileurl ? myprofileurl : profile;

  const onClickAction = () => {
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
          props.setIsLoggedin(true);
        }
      })
      .catch((error) => {
        console.log("\n Error in login ", error);
      });
  };
  return (
    <div className="p-grid">
      <Card className="form-card">
        <header className="p-col-12" style={{ textAlign: "center" }}>
          <h1>Login</h1>
        </header>
        <div>
          <div className="p-col-12 imgpro">
            {" "}
            <img className="proimg" src={profileurl} alt="Profile" />
          </div>

          <div className="p-col-12 p-logininput">
            <InputText
              className="text"
              type="email"
              placeholder="Email"
              style={{ textAlign: "center" }}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="p-col-12 p-logininput">
            <InputText
              className="text"
              type="password"
              placeholder="Password"
              style={{ textAlign: "center" }}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="p-grid" style={{ marginTop: 30 }}>
            <div className="p-col-1"></div>
            <div className="p-col-5" style={{ textAlign: "center" }}>
              <Checkbox
                name="a"
                label="Checkbox"
                checked={checkedOne}
                onChange={updateOne}
              />
              <label style={{ paddingLeft: 5 }}>Remember me</label>
            </div>

            <div className="p-col-5" style={{ textAlign: "center" }}>
              <a href="https://google.com">Forgot Password?</a>
            </div>
            <div className="p-col-1"></div>
          </div>

          <div className="p-grid p-fluid">
            <div className="p-col-3 p-md-3 p-xl-3 p-lg-3"></div>
            <div className="p-col-3 p-md-3 p-xl-3 p-lg-3">
              <Button
                label="Login"
                className="p-col-3 p-lg-3 p-xs-3"
                onClick={() => {
                  onClickAction();
                }}
              />
            </div>
            <div className="p-col-3 p-md-3 p-xl-3 p-lg-3">
              <Button label="Cancel" className="p-col-3 p-lg-3 p-xs-3" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
