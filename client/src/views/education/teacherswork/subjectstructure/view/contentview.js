import React from "react";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
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
  const getContentType = () => {
    switch (props.content.type) {
      case "text/html":
        return (
          <object
            type="text/html"
            data={props.content.url}
            width="800px"
            height="600px"
            style="overflow:auto;border:5px ridge blue"
          ></object>
        );
        break;
      case "YOUTUBE":
        return (
          <ReactPlayer
            className="react-player"
            url={props.content.url}
            controls={true}
            light={true}
            playbackRate
            width="420px"
            height="280px"
          />
        );

        break;
    }
  };
  return (
    <Col lg="6" md="6" sm="12" className="mb-2" key={props.content.idx}>
      <Card small className="card-post card-post--1">
        {props.content.type === "YOUTUBE" ? (
          <ReactPlayer
            className="react-player"
            url={props.content.url}
            controls={true}
            light={true}
            playbackRate
            width="420px"
            height="280px"
          />
        ) : (
          ""
        )}
        <Iframe
          url="https://zbimages.s3-ap-southeast-1.amazonaws.com/12th/profile/cnC4UEo4kwDjQnsRKX2px6.html"
          width="450px"
          height="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Card>
    </Col>
  );
}
