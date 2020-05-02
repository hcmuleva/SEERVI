/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
} from "shards-react";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import "./content.css";
const ContentFormOptionalDataAction = (props) => {
  const [statusVal, setStatusVal] = useState("APPROVED");
  const [stateVal, setStateVal] = useState("ACTIVE");
  const [availableVal, setAvailableVal] = useState("FREE");
  const [contentLevel, setContentLevel] = useState(1);
  return (
    <>
      <Card small className="mb-3">
        <div>
          <h1>{props.action}</h1>
        </div>
        <CardHeader className="border-bottom">
          <h6 className="m-0">{props.title}</h6>
        </CardHeader>

        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <span className="d-flex mb-2">
                <i className="material-icons mr-1">flag</i>
                <select
                  labelId="material-icons mr-1"
                  id="demo-customized-select"
                  onChange={(event) => {
                    setStatusVal(event.target.value);
                    props.setStatus(event.target.value);
                  }}
                >
                  <strong className="mr-1">{statusVal}</strong>
                  {props.statusList.map((status) => {
                    return <option value={status.name}>{status.name}</option>;
                  })}
                </select>
              </span>
              <span className="d-flex mb-2">
                <i className="material-icons mr-1">visibility</i>
                <select
                  labelId="material-icons mr-1"
                  id="demo-customized-select"
                  onChange={(event) => {
                    setStateVal(event.target.value);
                    props.setContentState(event.target.value);
                  }}
                >
                  {props.contentStateList.map((state) => {
                    return <option value={state}>{state}</option>;
                  })}
                </select>
              </span>
              <span className="d-flex mb-2">
                <i className="material-icons mr-1">line_weight</i>
                <select
                  labelId="material-icons mr-1"
                  id="demo-customized-select"
                  onChange={(event) => {
                    setAvailableVal(event.target.value);
                    props.setContentAvailable(event.target.value);
                  }}
                >
                  {props.contentAvailableList.map((available) => {
                    return <option value={available}>{available}</option>;
                  })}
                </select>
              </span>
              <span className="d-flex">
                <i className="material-icons mr-1">trending_up</i>
                <strong className="mr-1">Level:</strong>{" "}
                <select
                  labelId="material-icons mr-1"
                  id="demo-customized-select"
                  onChange={(event) => {
                    props.setContentLevel(event.target.value);
                  }}
                >
                  {props.contentLevelList.map((level) => {
                    return <option value={level}>{level}</option>;
                  })}
                </select>
              </span>
            </ListGroupItem>
            <ListGroupItem className="d-flex px-3 border-0">
              <Button
                outline
                theme="accent"
                size="sm"
                onClick={() => {
                  console.log("DRAFT SAVED");
                }}
              >
                <i className="material-icons">save</i> Save Draft
              </Button>
              <Button
                theme="accent"
                size="sm"
                className="ml-auto"
                onClick={() => {
                  console.log("Publisehd and SAVED");
                }}
              >
                <i className="material-icons">file_copy</i> Publish
              </Button>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
};

ContentFormOptionalDataAction.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
};

ContentFormOptionalDataAction.defaultProps = {
  title: "Actions",
};
function handleClick(e) {
  e.preventDefault();
  console.log("ContentFormOptionalDataAction The link was clicked.");
}
export default ContentFormOptionalDataAction;
