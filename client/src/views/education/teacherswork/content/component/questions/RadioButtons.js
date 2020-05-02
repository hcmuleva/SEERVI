import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Row, Col } from "shards-react";
export default function RadioButtons(props) {
  return props.radioList.map((elm, index) => {
    console.log("ELM ", elm);
    return (
      <Col key={index}>
        <FormControlLabel
          value={elm.value}
          control={<Radio />}
          label={elm.label}
          checked={props.radioVal === elm.value}
          onChange={(event) => {
            props.setRadioVal(event.target.value);
          }}
        />
      </Col>
    );
  });
}
