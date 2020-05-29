import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormRadio,
  FormInput,
} from "shards-react";

const QuestionTypeCheckbox = (props) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="px-3 pb-2">
          <FormRadio
            className="mb-1"
            value="CQ"
            checked={props.quetype === "SC"}
            onChange={(event) => {
              console.log("EVENT SC ");
              props.setQuetype("SC");
            }}
          >
            SC
          </FormRadio>
          <FormRadio
            className="mb-1"
            value="MCQ"
            checked={props.quetype === "MCQ"}
            onChange={(event) => {
              console.log("EVENT ", event.target.value);
              props.setQuetype("MCQ");
            }}
          >
            MCQ
          </FormRadio>
          <FormRadio
            className="mb-1"
            value="T/F"
            checked={props.quetype === "T/F"}
            onChange={(event) => {
              console.log("EVENT ", event.target.value);
              props.setQuetype("T/F");
            }}
          >
            T/F
          </FormRadio>
          <FormRadio
            className="mb-1"
            value="DESCRIPTIVE"
            checked={props.quetype === "DESCRIPTIVE"}
            onChange={(event) => {
              console.log("EVENT ", event.target.value);
              props.setQuetype("DESCRIPTIVE");
            }}
          >
            DESCRIPTIVE
          </FormRadio>
        </ListGroupItem>

        <ListGroupItem className="d-flex px-3">
          <InputGroup className="ml-auto">
            <FormInput placeholder="New category" />
            <InputGroupAddon type="append">
              <Button theme="white" className="px-2">
                <i className="material-icons">add</i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

export default QuestionTypeCheckbox;
