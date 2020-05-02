import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
export default function OptionTContentTypeRadio(props) {
  const [selection, setSelection] = useState(null);

  return (
    <div>
      TEXT
      <Radio
        checked={props.queDescelectedValue === "TEXT"}
        onChange={(event) => {
          props.setQueDescelectedValue(event.target.value);
        }}
        value="TEXT"
        label="Female"
        name="radio-button-demo"
        inputProps={{ "aria-label": "TEXT" }}
      ></Radio>
      HTML
      <Radio
        checked={props.queDescelectedValue === "HTML"}
        onChange={(event) => {
          props.setQueDescelectedValue(event.target.value);
        }}
        value="HTML"
        name="radio-button-demo"
        inputProps={{ "aria-label": "HTML" }}
      />
      UTUBE
      <Radio
        checked={props.queDescelectedValue === "YOUTUBE"}
        value="YOUTUBE"
        name="radio-button-demo"
        inputProps={{ "aria-label": "YOUTUBE" }}
        onChange={(event) => {
          props.setQueDescelectedValue(event.target.value);
        }}
      />
      FILE
      <Radio
        checked={props.queDescelectedValue === "FILE"}
        value="FILE"
        color="default"
        name="radio-button-demo"
        inputProps={{ "aria-label": "FILE " }}
        onChange={(event) => {
          props.setQueDescelectedValue(event.target.value);
        }}
      />
    </div>
  );
}
