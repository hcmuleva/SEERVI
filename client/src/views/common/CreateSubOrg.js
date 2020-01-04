import React from 'react'
import {
    Row,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    FormInput,
    FormSelect,
    Button
  } from "shards-react";
export default function CreateSubOrg() {
    
    return (
            <Col sm="12" md="6">
    <strong className="text-muted d-block mb-2">SubOrg Creation</strong>
    <Form>
      <Row form>
        <Col md="6" className="form-group">
          <FormInput
            placeholder="SubOrg Name"
            required
            
            onChange={() => {}}
          />
          <FormFeedback valid>The first name looks good!</FormFeedback>
        </Col>
        <Col md="6" className="form-group">
          <FormInput
       
            placeholder="Description"
            required
            
            onChange={() => {}}
          />
          <FormFeedback valid>The last name looks good!</FormFeedback>
        </Col>
      </Row>
      <Button outline size="sm" theme="primary" className="mb-2 mr-1">
      Submit
    </Button>
    <Button outline size="sm" theme="secondary" className="mb-2 mr-1">
    reset
  </Button>
    </Form>
  </Col>
  
       
    )
}
