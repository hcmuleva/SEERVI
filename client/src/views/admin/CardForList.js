/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";
import Box from '@material-ui/core/Box'

const CardForList = (props) => (
  
  <Card small className="mb-3">
  <div><h1>{props.action}</h1></div>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="p-3">
          {props.listData.map(org=>{
                  return <span key={org.id} className="d-flex mb-2">
            <i className="material-icons mr-1">groupwork</i>
            <strong className="mr-1">{org.name}</strong>
            <div onClick={()=>{console.log("EDIT is clicked", org.id)}}><a className="material-icons ml-5" href="#">
              edit
            </a></div>
            <a className="material-icons ml-5" href="#">
              delete
            </a>
            
          </span>

          })}
         
        </ListGroupItem>
        <ListGroupItem className="d-flex px-3 border-0">
         
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

CardForList.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

CardForList.defaultProps = {
  title: "Actions"
};
function handleClick(e) {
  e.preventDefault();
  console.log('CardForList The link was clicked.');
};
export default CardForList;
