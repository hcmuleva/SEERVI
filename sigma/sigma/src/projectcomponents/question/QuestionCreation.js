import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

import S3UploadFile from "../../common/S3UploadFile";

import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { GET_ALLQUESTIONS_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import { CREATE_QUESTION } from "../../service/graphql/education/teacher/mutations/question";

import OptionalField from "../common/OptionalField";
export function QuestionCreation(props) {
  console.log("Question CREATION  props ", props);
  const [createQuestion] = useMutation(CREATE_QUESTION);

  const [title, setTitle] = useState(null);
  const [url, setUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState({ fileInfo: "" });
  const [type, setType] = useState(props.contentTypeVal);
  const [content, setContent] = useState(null);
  const [state, setState] = useState("ACTIVE");
  const [status, setStatus] = useState("APPROVED");
  const [level, setLevel] = useState(1);
  const [available, setAvailable] = useState("FREE");
  const onUpload = (event) => {
    setType("FILE");
    S3UploadFile(event.target.files[0])
      .then((resp) => {
        setUrl(resp);
        setFileInfo({ fileInfo: event.target.files[0].type });
        console.log("uploadFileRESP ", resp);
      })
      .catch((err) => {
        console.log("ERROR ", err);
      });
  };
  const getEditorType = () => {
    switch (props.contentTypeVal) {
      case "HTML":
        return (
          <div>
            <Editor
              style={{ height: "220px" }}
              value={content}
              onTextChange={(e) => {
                props.setQuestionObj({
                  ...props.questionObj,
                  content: e.htmlValue,
                });
                setContent(e.htmlValue);
              }}
            />
          </div>
        );
        break;
      case "YOUTUBE":
        return (
          <div>
            <InputText
              placeholder="Title"
              style={{ width: 350, height: 40, textAlign: "center" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <h1> </h1>
            <InputText
              placeholder="YOUTUBE URL"
              style={{ width: 350, height: 50, textAlign: "center" }}
              onChange={(e) => {
                setUrl(e.target.value);
                content(e.target.value);
              }}
            />
          </div>
        );
        break;
      case "FILE":
        return (
          <div>
            <InputText
              placeholder="Title"
              style={{ width: 450, height: 40, textAlign: "center" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <h1> </h1>
            <FileUpload
              name="demo[]"
              onUpload={onUpload}
              multiple={false}
              maxFileSize={1000000}
            />
          </div>
        );
        break;
      case "TEXT":
        break;
    }
  };
  const resetData = () => {
    setTitle("");
    setFileInfo();
    setUrl("");
  };
  const saveContent = () => {
    return (
      <Button
        label="SAVE"
        icon="pi pi-check"
        onClick={() => {
          //We need to first check if its Editor or FileUpload.
          if ("HTML" === props.contentTypeVal) {
            setType("HTML");
            const file = new File([content], "HARDCODEDFILENAME.html", {
              type: "text/html",
            });
            S3UploadFile(file)
              .then((resp) => {
                let myobj = {
                  name: title,
                  fileInfo: fileInfo,
                  type: type,
                  url: resp,
                  level: level,
                  isPublished: true,
                  state: state,
                  status: status,
                  available: available,
                  description: "DUMMY",
                };
              })
              .catch((err) => {
                console.log(
                  "ERROR in Uploading HTML Data",
                  err,
                  " Error message ",
                  err.message
                );
              });
          }
        }}
      />
    );
  };
  return (
    <React.Fragment>
      {content ? saveContent() : ""}
      {getEditorType()}
    </React.Fragment>
  );
}
