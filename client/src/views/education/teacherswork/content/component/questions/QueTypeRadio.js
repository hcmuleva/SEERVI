import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";

import FormControlLabel from "@material-ui/core/FormControlLabel";
export default function QueTypeRadio(props) {
  return (
    <div>
      SC
      <Tooltip title="SingleChoice">
        <Radio
          checked={props.queTypeValue === "SC"}
          onChange={(event) => {
            props.setQueTypeValue(event.target.value);
          }}
          value="SC"
          label="Female"
          name="radio-button-demo"
          inputProps={{ "aria-label": "SC" }}
        ></Radio>
      </Tooltip>
      MCQ
      <Tooltip title="MultipleChoice">
        <Radio
          checked={props.queTypeValue === "MCQ"}
          onChange={(event) => {
            props.setQueTypeValue(event.target.value);
          }}
          value="MCQ"
          name="radio-button-demo"
          inputProps={{ "aria-label": "MCQ" }}
        />
      </Tooltip>
      T/F
      <Tooltip title="True Or False">
        <Radio
          checked={props.queTypeValue === "T/F"}
          value="T/F"
          color="default"
          name="radio-button-demo"
          inputProps={{ "aria-label": "T/F" }}
          onChange={(event) => {
            props.setQueTypeValue(event.target.value);
          }}
        />
      </Tooltip>
      SUB
      <Tooltip title="Subjective Written answer">
        <Radio
          checked={props.queTypeValue === "SUB"}
          value="SUB"
          name="radio-button-demo"
          inputProps={{ "aria-label": "SUB" }}
          onChange={(event) => {
            props.setQueTypeValue(event.target.value);
          }}
        />
      </Tooltip>
    </div>
  );
}
