import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Card, CardHeader, CardBody, Form, FormInput } from "shards-react";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import uploadFile from "../../../../commoncomponent/files/fileupload";
import "react-quill/dist/quill.snow.css";
import "../../../../../assets/quill.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const Editor = (props) => {
  let myData = "";
  const priview = (res) => {
    console.log("RES ", res);
    if (res) {
      fetch(res)
        .then((res) => res.text())
        .then((body) => {
          props.setPrevData(body);
          console.log("Finally able to read usiing fetch", body);
        });
    }
  };
  props.setType("HTML");
  return (
    <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post">
          {/** <FormInput size="lg" className="mb-3" placeholder="Your content Title" name="contentTitle" id="contentTitleId"/> */}
          <ReactQuill
            className="add-new-post__editor mb-1"
            modules={modules}
            formats={formats}
            onChange={(content, delta, source, editor) => {
              myData = content;
            }}
          />
          <input
            type="submit"
            value="save"
            onClick={(e) => {
              e.preventDefault();
              const file = new File([myData], props.fileName, {
                type: "text/html",
              });
              uploadFile(file).then((res) => {
                props.setUrl(res);
                props.setFileTypeInfo({ type: "text/html" });
                props.setType("HTML");
              });
            }}
          />
        </Form>
      </CardBody>
    </Card>
  );
};

export default Editor;
