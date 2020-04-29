import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Card, CardHeader, CardBody, Form, FormInput } from "shards-react";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import uploadFile from "../../../commoncomponent/files/fileupload";
import "react-quill/dist/quill.snow.css";
import "../../../../assets/quill.css";
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

  return (
    <Form className="add-new-post">
      {/** <FormInput size="lg" className="mb-3" placeholder="Your content Title" name="contentTitle" id="contentTitleId"/> */}
      <h6>
        <b>Note:</b>Please Enter content or copy paste in editor and click on
        save button below We are working on CallBack to remove save and it will
        smart way to save this content
      </h6>
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
            console.log("BEFORE SET FILE OBJECRT ", props.formObject);
            console.log("RESPONSE", res);
            props.setFileData({
              ...props.fileData,
              ["fileInfo"]: { fileInfo: "QUILE" },
              ["type"]: "text/html",
              ["url"]: res,
            });
            console.log(
              "AFTER SET FILE OBJECRT ",
              props.formObject,
              " RESP",
              res
            );
            console.log("AFTER ABOVE LIINERESPONSE", res);
          });
        }}
      />
    </Form>
  );
};

export default Editor;
