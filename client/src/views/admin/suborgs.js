import React from 'react'
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";

const  Suborgs=(props) =>(
    
  <Card small className="mb-3">
  <div><h1>{props.action}</h1></div>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <span className="d-flex mb-2">
            <i className="material-icons mr-1">flag</i>
            <strong className="mr-1">Status:</strong> Draft{" "}
            <a className="ml-auto" href="#">
              Edit
            </a>
          </span>
          <span className="d-flex mb-2">
            <i className="material-icons mr-1">visibility</i>
            <strong className="mr-1">Visibility:</strong>{" "}
            <strong className="text-success">Public</strong>{" "}
            <a className="ml-auto" href="#">
              Edit
            </a>
          </span>
          <span className="d-flex mb-2">
            <i className="material-icons mr-1">calendar_today</i>
            <strong className="mr-1">Schedule:</strong> Now{" "}
            <a className="ml-auto" href="#" onClick={(e,prop)=>{
              e.preventDefault()
              //visibility="harish"
              console.log("Clicked me",prop)
            }}>
              Edit
            </a>
          </span>
          <span className="d-flex">
            <i className="material-icons mr-1">score</i>
            <strong className="mr-1">Readability:</strong>{" "}
            <strong className="text-warning">Ok</strong>
          </span>
        </ListGroupItem>
        <ListGroupItem className="d-flex px-3 border-0">
          <Button outline theme="accent" size="sm" onClick={()=>{console.log("DRAFT SAVED")}}>
            <i className="material-icons">save</i> Save Draft
          </Button>
          <Button theme="accent" size="sm" className="ml-auto" onClick={()=>{console.log("Publisehd and SAVED")}}>
            <i className="material-icons">file_copy</i> Publish
          </Button>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

Suborgs.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Suborgs.defaultProps = {
  title: "ActionsHCM"
};
function handleClick(e) {
  e.preventDefault();
  console.log('SidebarActions The link was clicked.');
};
export default Suborgs;
