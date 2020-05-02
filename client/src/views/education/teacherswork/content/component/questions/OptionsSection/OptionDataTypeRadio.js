import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";

import FormControlLabel from "@material-ui/core/FormControlLabel";
export default function OptionDataTypeRadio(props) {
  console.log("Props in OptionDataTypeRadio", props);
  return (
    <div>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Tooltip title="TEXT">
            <Radio
              id="OPTION_TEXT"
              checked={props.optionTypeValue === "TEXT"}
              onChange={(event) => {
                props.setOptionTypeValue(event.target.value);
              }}
              value="TEXT"
              name="radio-button-demo"
              inputProps={{ "aria-label": "OPTION_TEXT" }}
            ></Radio>
          </Tooltip>
        }
        label="TEXT"
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Tooltip title="HTML Content">
            <Radio
              checked={props.optionTypeValue === "HTML"}
              onChange={(event) => {
                props.setOptionTypeValue(event.target.value);
              }}
              value="HTML"
              name="radio-button-demo"
              inputProps={{ "aria-label": "HTML" }}
            />
          </Tooltip>
        }
        label="HTML"
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Tooltip title="True Or False">
            <Radio
              checked={props.optionTypeValue === "YOUTUBE"}
              value="YOUTUBE"
              color="default"
              name="radio-button-demo"
              inputProps={{ "aria-label": "YOUTUBE" }}
              onChange={(event) => {
                props.setOptionTypeValue(event.target.value);
              }}
            />
          </Tooltip>
        }
        label="UTUBE"
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Tooltip title="Subjective Written answer">
            <Radio
              checked={props.optionTypeValue === "FILE"}
              value="FILE"
              name="radio-button-demo"
              inputProps={{ "aria-label": "FILE" }}
              onChange={(event) => {
                props.setOptionTypeValue(event.target.value);
              }}
            />
          </Tooltip>
        }
        label="FILE"
      />
    </div>
  );
}
