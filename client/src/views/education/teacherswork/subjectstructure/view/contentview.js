import React from "react";
import ReactPlayer from "react-player";

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

export default function Contentview(props) {
  console.log("PROPS for Content card", props);
  let bg_pict = require("../../../../../images/content-management/8.jpeg");

  if (props.picture) {
    bg_pict = props.content.picture;
  }

  return (
    <Col lg="6" md="6" sm="12" className="mb-2" key={props.content.idx}>
      <Card small className="card-post card-post--1">
        <ReactPlayer
          className="react-player"
          url={props.content.url}
          controls={true}
          light={true}
          playbackRate
          width="420px"
          height="280px"
        />
      </Card>
    </Col>
  );
}
