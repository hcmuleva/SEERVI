import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import S3UploadFile from "../../common/S3UploadFile";

import { Editor } from "primereact/editor";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown } from "primereact/dropdown";
import { TreeViewContentCreation } from "../content/TreeViewContentCreation";

import { CREATE_FORMULA } from "../../service/graphql/education/teacher/mutations/formula";
import { GET_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import OptionalField from "../common/OptionalField";
import StudentSubjectView from "../student/StudentSubjectView";
export function Formulas(props) {
  const subjectid = props.subjectid;
  console.log("SubjectID ", subjectid);
  const [createFormula] = useMutation(CREATE_FORMULA);
  const [title, setTitle] = useState(null);
  const [url, setUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState({ fileInfo: "" });
  const [type, setType] = useState(props.contentTypeVal);
  const [content, setContent] = useState(null);
  const [state, setState] = useState("ACTIVE");
  const [status, setStatus] = useState("APPROVED");
  const [level, setLevel] = useState(1);
  const [available, setAvailable] = useState("FREE");
  const [file, setFile] = useState(null);
  const onUpload = (event) => {
    setType("FILE");
    setFile(event.target.files[0]);
  };
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-clone",
    },
  ];
  const [contentLevel, setContentLevel] = useState("SUBJECT");
  const [itemVal, setItemVal] = useState(items);
  const [contentTypeVal, setContentTypeVal] = useState("HTML");

  const [contentType, setContentType] = useState([
    { label: "HTML", value: "HTML" },
    { label: "YOUTUBE", value: "YOUTUBE" },
    { label: "FILE", value: "FILE" },
  ]);
  const [materialTypeVal, setMaterialTypeVal] = useState("MATERIAL");
  const [materialType, setMaterialType] = useState([
    { label: "MATERIAL", value: "MATERIAL" },
    { label: "QUESTIONBANK", value: "QUESTIONBANK" },
    { label: "EXAMS", value: "EXAMS" },
    { label: "FORMULAS", value: "FORMULAS" },
    { label: "TIPS&TRICKS", value: "TIPS&TRICKS" },
    { label: "PAPERS", value: "PAPERS" },
  ]);
  const [contentTitle, setContentTitle] = useState(props.match.params.name);
  const [createText, setCreateText] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [inline, setInline] = useState(null);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_SUBJECT_BY_ID,
    {
      variables: { id: subjectid },
    }
  );
  if (unitError) {
    console.log("UNIT ERROR", unitError);
    return <p>Unit ERROR: {unitError.message}</p>;
  }
  if (unitData === undefined) {
    console.log("UNIT DATA UNDIFINED");
    return <p>ERROR in GETTing unit</p>;
  }
  if (unitLoading) {
    console.log("UNIT DATA is LOADING");
    return <div>UnitData Loading...</div>;
  }
  console.log("UNIT DATA");
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
                setUrl(resp);
                console.log("uploadFileRESP ", resp);

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
                if (!props.treeData) {
                  console.log("SET SUBJECT LEVEL ");
                  myobj["subject"] = subjectid;
                } else {
                  if (props.treeData && "UNIT" === props.treeData.type) {
                    console.log("SET UNIT LEVEL ");
                    myobj["unit"] = props.treeData.id;
                  } else if (
                    props.treeData &&
                    "TOPIC" === props.treeData.type
                  ) {
                    console.log("SET TOPIC LEVEL ");
                    myobj["topic"] = props.treeData.id;
                  }
                }
                console.log("myobj", myobj);
                createFormula({
                  variables: myobj,
                  refetchQueries: [
                    {
                      query: GET_SUBJECT_BY_ID,
                      variables: { id: subjectid },
                    },
                  ],
                })
                  .then((res) => {
                    console.log("Created content", res);
                    resetData();
                  })
                  .catch((err) => {
                    throw new Error("Error in creating content ");
                  });
              })
              .catch((err) => {
                console.log("ERROR ", err);
              });
          } else if ("FILE" === props.contentTypeVal) {
            setType("FILE");

            S3UploadFile(file)
              .then((resp) => {
                let myobj = {
                  name: title,
                  fileInfo: { info: file.type },
                  type: type,
                  url: resp,
                  level: level,
                  isPublished: true,
                  state: state,
                  status: status,
                  available: available,
                  description: "DUMMY",
                };
                if (!props.treeData) {
                  console.log("SET SUBJECT LEVEL ");
                  myobj["subject"] = props.subjectid;
                } else {
                  if (props.treeData && "UNIT" === props.treeData.type) {
                    console.log("SET UNIT LEVEL ");
                    myobj["unit"] = props.treeData.id;
                  } else if (
                    props.treeData &&
                    "TOPIC" === props.treeData.type
                  ) {
                    console.log("SET TOPIC LEVEL ");
                    myobj["topic"] = props.treeData.id;
                  }
                }
                console.log("myobj", myobj);
                createFormula({
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
                    resetData = {};
                  })
                  .catch((err) => {
                    throw new Error("Error in creating content ");
                  });
              })
              .catch((err) => {
                console.log("ERROR ", err);
              });
          } else {
            let myobj = {
              name: title,
              fileInfo: fileInfo,
              type: "YOUTUBE",
              url: url,
              level: level,
              isPublished: true,
              state: state,
              status: status,
              available: available,
              description: "DUMMY",
            };
            if (!props.treeData) {
              console.log("SET SUBJECT LEVEL ");
              myobj["subject"] = props.subjectid;
            } else {
              if (props.treeData && "UNIT" === props.treeData.type) {
                console.log("SET UNIT LEVEL ");
                myobj["unit"] = props.treeData.id;
              } else if (props.treeData && "TOPIC" === props.treeData.type) {
                console.log("SET TOPIC LEVEL ");
                myobj["topic"] = props.treeData.id;
              }
            }
            console.log("myobj", myobj);
            createFormula({
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
                resetData = {};
              })
              .catch((err) => {
                throw new Error("Error in creating content ");
              });
          }

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
      <h1>Formulas</h1>

      <div className="p-grid ">
        <div className="card card-w-title" style={{ marginLeft: "10px" }}>
          <div
            className="content-section introduction"
            style={{ marginLeft: "5px" }}
          >
            {unitLoading ? (
              <div>Loading ....</div>
            ) : (
              <TreeViewContentCreation
                items={itemVal}
                unitData={unitData.getSubjectById}
                setContentLevel={setContentLevel}
                setContentTitle={setContentTitle}
                setTreeData={setTreeData}
                subjectid={subjectid}
              />
            )}
          </div>
        </div>

        <div className="card card-w-title" style={{ marginLeft: "10px" }}>
          <Button
            label={contentTitle}
            disabled="disabled"
            className="p-button p-button-secondary"
            style={{
              textAlign: "center",
              marginTop: ".3em",
              marginLeft: ".3em",
              width: "10em",
            }}
          />

          <Dropdown
            value={contentTypeVal}
            options={contentType}
            onChange={(e) => {
              setContentTypeVal(e.value);
            }}
            filter={true}
            filterPlaceholder="Select Car"
            filterBy="label,value"
            showClear={true}
            style={{
              textAlign: "center",
              marginTop: ".3em",
              marginLeft: ".3em",
              width: "10em",
            }}
          />
          <Dropdown
            value={materialTypeVal}
            options={materialType}
            onChange={(e) => {
              setMaterialTypeVal(e.value);
            }}
            filter={true}
            filterPlaceholder="Select Car"
            filterBy="label,value"
            showClear={true}
            style={{
              textAlign: "center",
              marginTop: ".3em",
              marginLeft: ".3em",
              width: "10em",
            }}
          />
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
        <Accordion
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <AccordionTab>
            {" "}
            <Formulas
              contentTypeVal={contentTypeVal}
              treeData={treeData}
              materialTypeVal={materialTypeVal}
              subjectid={subjectid}
            />
          </AccordionTab>
          <AccordionTab header="Preview">
            <StudentSubjectView />
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}
