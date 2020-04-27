import React from "react";
import { Row, Col, FormInput } from "shards-react";
export default function YoutubeContent(props) {
  props.setType("YOUTUBE");
  return (
    <Row>
      <Col md="6" className="form-group">
        <FormInput
          placeholder="YouTube URL"
          onChange={props.handleChange("url")}
        />
      </Col>
    </Row>
  );
}
