import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import S3UploadFile from "../../common/S3UploadFile";

import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { CREATE_CONTENT } from "../../service/graphql/education/teacher/mutations/content";
import { GET_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import OptionalField from "../common/OptionalField";
export function Material(props) {
  const [createContent] = useMutation(CREATE_CONTENT);
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
            <InputText
              placeholder="Title"
              style={{ width: 450, height: 40, textAlign: "center" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Editor
              style={{ height: "220px" }}
              value={content}
              onTextChange={(e) => setContent(e.htmlValue)}
            />
          </div>
        );
        break;
      case "YOUTUBE":
        return (
          <div className="p-grid">
            <div className="p-col-12">
              {" "}
              <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                {/*  <Checkbox
                  checked={contentTitle}
                  onChange={(event) => setContentTitle(event.checked)}
                /> */}
              </span>
              <InputText
                placeholder="Title"
                style={{ width: 450, height: 40, textAlign: "center" }}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <InputText
                placeholder="YOUTUBE URL"
                style={{ width: 450, height: 50, textAlign: "center" }}
                onChange={(e) => {
                  setUrl(e.target.value);
                  content(e.target.value);
                }}
              />
            </div>
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
                setUrl(resp);
                console.log("uploadFileRESP ", resp);
              })
              .catch((err) => {
                console.log("ERROR ", err);
              });
          }

          let myobj = {
            name: title,
            fileInfo: fileInfo,
            type: type,
            url: url,
            level: level,
            isPublished: true,
            state: state,
            status: status,
            available: available,
            description: "DUMMY",
          };
          if (!props.treeData) {
            myobj["subject"] = props.subjectid;
          } else {
            if (props.treeData && "UNIT" === props.treeData.type) {
              myobj["unit"] = props.treeData.id;
            } else if (props.treeData && "TOPIC" === props.treeData.type) {
              myobj["topic"] = props.treeData.id;
            }
          }
          createContent({
            variables: myobj,
            refetchQueries: [
              {
                query: GET_SUBJECT_BY_ID,
                variables: { id: props.subjectid },
              },
            ],
          })
            .then((res) => {
              console.log("Created content", res);
            })
            .catch((err) => {
              throw new Error("Error in creating content ");
            });
          //1. check if props.treeData?<>: Subject level Create Content
          //2. check if props.treeData?<type: "UNIT/TOPIC">: Unit/Topic level Create Content:""
          //Object Formation?
          //Return query? SubjectID
        }}
      />
    );
  };
  return (
    <div>
      <h1>Material</h1>
      {content ? saveContent() : ""}
      {getEditorType()}
      <OptionalField
        state={state}
        setState={setState}
        status={status}
        setStatus={setStatus}
        level={level}
        setLevel={setLevel}
        available={available}
        setAvailable={setAvailable}
      />
      <div>
        state{state}:status{status}:available{available}:level{level}
      </div>
    </div>
  );
}
