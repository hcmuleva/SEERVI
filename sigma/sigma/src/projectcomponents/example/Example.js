import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ExampleTreeView } from "./ExampleTreeView";
import { CREATE_EXAMPLE } from "../../service/graphql/education/teacher/mutations/example";
import { GET_ALLEXAMPLE_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import S3UploadFile from "../../common/S3UploadFile";

export function Example(props) {
  console.log("PROPS contebr ", props);
  const subjectid = props.subjectid ? props.subjectid : props.match.params.id;

  const levelList = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  const [contentType, setContentType] = useState([
    { label: "HTML", value: "HTML" },
    { label: "YOUTUBE", value: "YOUTUBE" },
    { label: "FILE", value: "FILE" },
  ]);
  /** TBB */
  const [contentLevel, setContentLevel] = useState("SUBJECT");

  const [level, setLevel] = useState(1);
  const [state, setState] = useState("ACTIVE");
  const [status, setStatus] = useState("APPROVED");
  const [available, setAvailable] = useState("FREE");
  const [contentTypeVal, setContentTypeVal] = useState("HTML");
  const [contentTitle, setContentTitle] = useState("SUBJECT");
  const [title, setTitle] = useState("");
  const [contentData, setContentData] = useState("");
  const [url, setUrl] = useState("");
  const [fileInfo, setFileInfo] = useState({});
  const [treeData, setTreeData] = useState(null);
  const [createExample] = useMutation(CREATE_EXAMPLE);

  const onUpload = (event) => {
    setContentTypeVal("FILE");
    S3UploadFile(event.files[0])
      .then((resp) => {
        setUrl(resp);
        setFileInfo({ fileInfo: event.files[0].type });
        console.log("uploadFileRESP ", resp);
      })
      .catch((err) => {
        console.log("ERROR ", err);
      });
  };
  const cleanpage = () => {
    setTitle("");
    setContentData("");
    setUrl("");
  };
  const createExampleFunction = (myurl) => {
    let myobj = {
      name: title,
      fileInfo: fileInfo,
      type: contentTypeVal,
      url: myurl,
      level: level,
      isPublished: true,
      state: state,
      status: status,
      available: available,
      description: "DUMMY",
    };
    if (!treeData) {
      myobj["subject"] = subjectid;
    } else {
      if (treeData && "UNIT" === treeData.type) {
        myobj["unit"] = treeData.id;
      } else if (treeData && "TOPIC" === treeData.type) {
        myobj["topic"] = treeData.id;
      }
    }
    console.log("BEFORE CREATE CONTENT", myobj);
    createExample({
      variables: myobj,
      refetchQueries: [
        {
          query: GET_ALLEXAMPLE_SUBJECT_BY_ID,
          variables: { id: props.subjectid },
        },
      ],
    })
      .then((resp) => {
        console.log("Created content", resp);
      })
      .catch((err) => {
        throw new Error("Error in creating content ");
      });
    cleanpage();
  };
  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_ALLEXAMPLE_SUBJECT_BY_ID,
    {
      variables: { id: subjectid },
    }
  );
  if (unitError) {
    return <p>Unit ERROR: {unitError.message}</p>;
  }
  if (unitData === undefined) {
    return <p>ERROR in GETTing unit</p>;
  }
  if (unitLoading) {
    return <div>UnitData Loading...</div>;
  }
  const getEditor = () => {
    console.log("contentTypeVal", contentTypeVal);
    switch (contentTypeVal) {
      case "HTML":
        return (
          <Editor
            style={{ height: "220px" }}
            value={contentData}
            onTextChange={(e) => {
              setContentData(e.htmlValue);
            }}
          />
        );
      case "YOUTUBE":
        return (
          <InputText
            placeholder="YOUTUBE URL"
            style={{ width: 350, height: 50, textAlign: "center" }}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        );
      case "FILE":
        return (
          <FileUpload
            name="demo[]"
            onUpload={onUpload}
            multiple={false}
            maxFileSize={1000000}
          />
        );
    }
  };

  return (
    <div className="p-grid ">
      <div className="card card-w-title" style={{ marginLeft: "10px" }}>
        <div
          className="content-section introduction"
          style={{ marginLeft: "5px" }}
        >
          {unitLoading ? (
            <div>Loading ....</div>
          ) : (
            <ExampleTreeView
              unitData={unitData.getSubjectById}
              setContentLevel={setContentLevel}
              setContentTitle={setContentTitle}
              setTreeData={setTreeData}
              subjectid={subjectid}
            />
          )}
        </div>
      </div>
      <div className="p-col-12 p-md-9 p-lg-9">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <InputText
              placeholder="Enter Title"
              value={title}
              style={{
                paddingLeft: "21em",
                paddingRight: "21em",
                textAlign: "center",
              }}
              onChange={(e) => {
                console.log("E ", e.target.value);
                setTitle(e.target.value);
              }}
            />
          </span>
          <span className="p-inputgroup-addon">
            <Dropdown
              value={contentTypeVal}
              options={contentType}
              onChange={(e) => {
                setContentTypeVal(e.value);
              }}
              autoWidth={true}
            />
          </span>
          <span className="p-inputgroup-addon">
            <Dropdown
              placeholder="Level"
              options={levelList}
              value={level}
              onChange={(event) => setLevel(event.value)}
              autoWidth={true}
            />
          </span>
        </div>
        {getEditor()}
        <Button
          label="CREATE "
          className="p-button-raised p-button"
          onClick={() => {
            //We need to first check if its Editor or FileUpload.
            if ("HTML" === contentTypeVal) {
              setContentTypeVal("HTML");
              const file = new File([contentData], "HARDCODEDFILENAME.html", {
                type: "text/html",
              });
              S3UploadFile(file)
                .then((resp) => {
                  setUrl(resp);
                  console.log("uploadFileRESP ", resp);
                  createExampleFunction(resp);
                })
                .catch((err) => {
                  console.log("ERROR ", err);
                });
            } else {
              createExampleFunction(url);
            }
          }}
        />
      </div>
    </div>
  );
}
