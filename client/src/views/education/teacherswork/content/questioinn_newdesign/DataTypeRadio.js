import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
export default function DataTypeRadio(props) {
  const [selection, setSelection] = useState(null);

  return (
    <div>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Radio
            checked={props.datatype === "CONTENT"}
            onChange={(event) => {
              props.setDatatype(event.target.value);
            }}
            value="CONTENT"
            label="Female"
            name="radio-button-demo"
            inputProps={{ "aria-label": "CONTENT" }}
          ></Radio>
        }
        label="CONTENT"
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Radio
            checked={props.datatype === "QUESTION"}
            onChange={(event) => {
              props.setDatatype(event.target.value);
            }}
            value="QUESTION"
            name="radio-button-demo"
            inputProps={{ "aria-label": "QUESTION" }}
          />
        }
        label="QUESTION"
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Radio
            checked={props.datatype === "EXAMPLE"}
            value="EXAMPLE"
            name="radio-button-demo"
            inputProps={{ "aria-label": "EXAMPLE" }}
            onChange={(event) => {
              props.setDatatype(event.target.value);
            }}
          />
        }
        label="EXAMPLE"
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Radio
            checked={props.datatype === "TIPSTRICKS"}
            value="TIPSTRICKS"
            color="default"
            name="radio-button-demo"
            inputProps={{ "aria-label": "TIPSTRICKS " }}
            onChange={(event) => {
              props.setDatatype(event.target.value);
            }}
          />
        }
        label="TIPSTRICKS"
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Radio
            checked={props.datatype === "FORMULA"}
            value="FORMULA"
            color="default"
            name="radio-button-demo"
            inputProps={{ "aria-label": "FORMULA " }}
            onChange={(event) => {
              props.setDatatype(event.target.value);
            }}
          />
        }
        label="FORMULA"
      />
    </div>
  );
}
