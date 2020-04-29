import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
} from "shards-react";
import ReactPlayer from "react-player";

export default function Unitcard(props) {
  console.log("PROPS for unit card", props);
  let bg_pict = require("../../../../../images/content-management/9.jpeg");

  if (props.picture) {
    bg_pict = props.picture;
  }
  return (
    <Col lg="4" md="6" sm="12" className="mb-3" key={props.idx}>
      <Card key={props.idx} small className="card-post card-post--1">
        <div
          className="card-post__image"
          style={{ backgroundImage: `url('${bg_pict}')` }}
        >
          <Badge pill className={`card-post__category bg-dark`}>
            CBSE
          </Badge>
          <div key={props.idx} className="card-post__author d-flex">
            <a
              href="#"
              className="card-post__author-avatar card-post__author-avatar--small"
              style={{ backgroundImage: `url('${bg_pict}')` }}
            >
              Faculty {props.author}
            </a>
          </div>
          <div className="card-post__notes d-flex"> </div>
        </div>
        <CardBody>
          <h5 className="card-title">
            <a href="#" className="text-fiord-blue">
              {props.unit.name}
            </a>
          </h5>
          <p className="card-text d-inline-block mb-3">
            {props.unit.description}
          </p>
          <span className="text-muted">{props.date}</span>
        </CardBody>
      </Card>
    </Col>
  );
}
