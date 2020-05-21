import React, { useState } from "react";
import { Editor } from "primereact/editor";

import { Button } from "primereact/button";
export default function QuestionContent(props) {
  return (
    <React.Fragment>
      <Editor
        style={{ height: "220px" }}
        value={props.questionContent}
        onTextChange={(e) => {
          props.setQuestionContent(e.htmlValue);
        }}
      />
    </React.Fragment>
  );
}
