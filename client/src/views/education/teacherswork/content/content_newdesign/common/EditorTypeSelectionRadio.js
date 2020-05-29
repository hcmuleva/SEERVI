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

const EditorTypeSelectionRadio = (props) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="px-3 pb-2">
          <FormRadio
            className="mb-1"
            value="HTML"
            checked={props.contentType === "HTML"}
            onChange={(event) => {
              console.log("EVENT HTML ");
              props.setContentType("HTML");
            }}
          >
            HTML
          </FormRadio>
          <FormRadio
            className="mb-1"
            value="YOUTUBE"
            checked={props.contentType === "YOUTUBE"}
            onChange={(event) => {
              console.log("EVENT ", event.target.value);
              props.setContentType("YOUTUBE");
            }}
          >
            YOUTUBE
          </FormRadio>
          <FormRadio
            className="mb-1"
            value="FILE"
            checked={props.contentType === "FILE"}
            onChange={(event) => {
              console.log("EVENT ", event.target.value);
              props.setContentType("FILE");
            }}
          >
            FILE
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

export default EditorTypeSelectionRadio;
