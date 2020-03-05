import React, { useState } from "react";
import { Row,Col,Button } from "shards-react";
import ResponsiveDialog from './Component/Dialog/StudiesSelection'

export default function RegisterForm(props) {
    const [userRegisterFormData, setUserRegisterFormData] = useState({});
    const [confirmPassword, setConfirmPassword]=useState(null)
    const [profession,setProfession] = useState({student:false,agriculture:false,business:false,service:false});
    const [professionSelection,setProfessionSelection] = useState({studentSelection:false,agricultureSelection:false,businessSelection:false,serviceSelection:false,hcmSelection:false});
    const [studies,setStudies] = useState(null)
    const setStudentSelectinFunc = (selection)=>{
    setProfessionSelection({...professionSelection,studentSelection:selection})
    }

    if(profession.student &!professionSelection.studentSelection){
        return <ResponsiveDialog open={true} studentControllder={setStudentSelectinFunc} mystudies={setStudies} />
    }
    console.log("studies",studies)
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
                  console.log("Selected Profession",profession)
                 // if(confirmPassword!==userRegisterFormData.password) throw new Error("Password mismatched")
                  //props.registerUserData(userRegisterFormData)
                  
                }}
              >
                <h3 className="text-center text-info">Register</h3>
                   <br/>
                 <div className="form-group" className="col-md-12">
                 
                 <Row>
                 <Col>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="FirstName"
                    className="form-control"
                    onChange={e => {
                      setUserRegisterFormData({
                        ...userRegisterFormData,
                        firstname: e.target.value
                      });
                    }}
                  />
                     </Col>
                      <Col>
             
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="LastName"
                    className="form-control"
                    onChange={e => {
                      setUserRegisterFormData({
                        ...userRegisterFormData,
                        lastname: e.target.value
                      });
                    }}
                  />
                   </Col>
                  </Row>
                     <br/>
                </div>
                
                <div className="form-group" className="col-md-12">
                 <Row><Col>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={e => {
                      setUserRegisterFormData({
                        ...userRegisterFormData,
                        email: e.target.value
                      });
                    }}
                  />
                  </Col>
                  <Col>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="form-control"
                    onChange={e => {
                        setUserRegisterFormData({ ...userRegisterFormData,password:e.target.value});
                    }}
                  />
                  </Col>
                  <Col>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    className="form-control"
                    onChange={e => {
                        setConfirmPassword(e.target.value)
                    }}
                  />
                  </Col>
                  
                  </Row>
                </div>
                
                <div className="form-group">
                    <br/>
                  <label htmlFor="Profession" className="text-info">
                  <span>Your Profession:</span> 
                  &nbsp;&nbsp;
                    <span>Student</span> 
                    <span>
                      <input
                        id="student-me"
                        name="student-me"
                        type="checkbox"
                        defaultChecked={profession.student}
                        onClick={(e)=>{
                            setProfession({...profession, student:e.target.checked})
                        }}
                      />
                    </span>
                    &nbsp;&nbsp;
                    <span>Agriculture</span> 
                    <span>
                      <input
                        id="agriculture-me"
                        name="agriculture-me"
                        type="checkbox"
                        defaultChecked={profession.agriculture}
                        onClick={(e)=>{setProfession({...profession, agriculture:e.target.checked})}}
                      />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span>Business</span> 
                    <span>
                      <input
                        id="business-me"
                        name="business-me"
                        type="checkbox"
                        defaultChecked={profession.business}
                        onClick={(e)=>{setProfession({...profession, business:e.target.checked})}}
                      />
                    </span>
                    &nbsp;&nbsp;&nbsp;
                     <span>Service</span> 
                    <span>
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        defaultChecked={profession.service}
                         onClick={(e)=>{setProfession({...profession, service:e.target.checked})}}
                    
                      />
                    </span>
                        <br/>
                {     
                    studies?
                         (<span>You Studies in:{studies}</span> ):<span>"No Studeies"</span>
                }
                  </label>
                    <br/>
                   <br/>
                      <br/>
                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Row>
                    <Col>
                    </Col>
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="submit"
                  />
                  &nbsp;
                  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="submit"
                    name="register"
                    className="btn btn-success btn-md"
                    value="register"
                  />
                  <Col>
                    </Col>
                  </Row>
                </div>
            
               

                <div id="register-link" className="text-right">
                    
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
