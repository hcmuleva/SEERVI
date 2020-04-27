import React from "react";
import { Row, Col, FormInput } from "shards-react";

export default function Fileattachment(props) {
  props.setType("FILE");
  return (
    <Row>
      <Col md="6" className="form-group">
        <FormInput
          type="file"
          className="custom-file-input"
          id="customFile2"
          onChange={(e) => {
            console.log("File uploaded mime type=>", e.target.files[0].type);
            props.setFileInfo({ file: e.target.files[0].type });
          }}
        />

        <label className="custom-file-label" htmlFor="customFile2">
          Choose file...
        </label>
      </Col>
    </Row>
  );
}
