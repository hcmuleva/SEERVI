import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormInput,
  FormFeedback,
  FormGroup,
  FormSelect
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
export default function OrgDetails(props) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
 console.log("HELLO",props)
  const creatUserHandler = () => {
    if (userConfirmPassword === userPassword) {
      console.log("userConfirmPassword is match");
    } else {
      console.log("DID NOT Match");
    }
    console.log("userFirstName",userFirstName, "LastName",userLastName, "userPassword",userPassword, "email",useremail)
  };
  return (
    <Col sm="12" md="6">
      <strong className="text-muted d-block mb-2">Form Validation:: {props.data}</strong>
      <Form>
        <Row form>
          <Col md="6" className="form-group">
            <FormInput
              placeholder="Enter First name"
              required
              valid
              onChange={e => {
                setUserFirstName(e.target.value);
              }}
            />
            <FormFeedback valid>The first name looks good!</FormFeedback>
          </Col>
          <Col md="6" className="form-group">
            <FormInput
              placeholder="Enter Last name"
              required
              valid
               onChange={e => {
                setUserLastName(e.target.value);
              }}
            />
            <FormFeedback valid>The last name looks good!</FormFeedback>
          </Col>
          <Col md="6" className="form-group">
            <FormInput
              placeholder="password"
              required
              onChange={e => {
                setUserPassword(e.target.value);
              }}
            />
           
          </Col>
          <Col md="6" className="form-group">
            <FormInput
              placeholder="confirm password"
              required
             
              onChange={e => {
                setUserConfirmPassword(e.target.value);
              }}
            />
          </Col>
        </Row>
        <FormGroup>
          <FormInput placeholder="email" required
             
              onChange={e => {
                setUseremail(e.target.value);
              }} />
         
        </FormGroup>
        <Button
          outline
          size="sm"
          theme="primary"
          className="mb-2 mr-1"
          onClick={creatUserHandler}
        >
          Create
        </Button>
      </Form>
    </Col>
  );
}
