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

export default function Topiccard(props) {
  console.log("PROPS for Topic card", props);
  let bg_pict = require("../../../../../images/content-management/3.jpeg");
  let desc =
    "Morning prudent removal an letters by. On could my in order never it. Or excited certain sixteen it to parties colonel not seeing...";
  if (props.picture) {
    bg_pict = props.picture;
  }
  if (props.description) {
    desc = props.description;
  }
  return (
    <Col lg="4" md="6" sm="12" className="mb-3" key={props.idx}>
      <Card small className="card-post card-post--1">
        <div
          className="card-post__image"
          style={{ backgroundImage: `url(${bg_pict})` }}
        >
          <Badge pill className={`card-post__category bg-dark`}>
            CBSE
          </Badge>
          <div className="card-post__author d-flex">
            <a
              href="#"
              className="card-post__author-avatar card-post__author-avatar--small"
              style={{ backgroundImage: `url('${props.topic.authorAvatar}')` }}
            >
              Written by {props.topic.picture}
            </a>
          </div>
          <div className="card-post__notes d-flex">
            <h4>HARDCODED</h4>
          </div>
        </div>
        <CardBody>
          <h5 className="card-title">
            <a href="#" className="text-fiord-blue">
              {props.topic.name}
            </a>
          </h5>
          <p className="card-text d-inline-block mb-3">{desc}</p>
        </CardBody>
      </Card>
    </Col>
  );
}
