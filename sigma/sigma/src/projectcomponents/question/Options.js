import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import S3UploadFile from "../../common/S3UploadFile";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export default function Options(props) {
  const [title, setTitle] = useState(null);
  const [url, setUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState({ fileInfo: "" });
  const [type, setType] = useState("HTML");
  const [content, setContent] = useState(null);
  const [optionindex, setOptionindex] = useState(null);
  const [mcqCorrect, setMcqCorrect] = useState([]);
  const contentTypeList = [
    { label: "HTML", value: "HTML" },
    { label: "YOUTUBE", value: "YOUTUBE" },
    { label: "FILE", value: "FILE" },
  ];
  const onChangeMCQ = (e) => {
    let selectedMCQ = [...mcqCorrect];
    let myData = props.optionData;
    if (e.checked) {
      myData[e.value] = { ...myData[e.value], isCorrect: true };
      selectedMCQ.push(e.value);
    } else {
      myData[e.value] = { ...myData[e.value], isCorrect: false };
      selectedMCQ.splice(selectedMCQ.indexOf(e.value), 1);
    }
    setMcqCorrect(selectedMCQ);
  };

  const [contentType, setContentType] = useState("HTML");
  const header = (
    <React.Fragment>
      {content ? (
        <Button
          label="AddOption"
          icon="pi pi-check"
          onClick={() => {
            const myData = content;
            props.setOptionData([...props.optionData, { data: myData }]);
            setContent("");
          }}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );

  const onUpload = (event) => {
    //     setType("FILE");
    //     S3UploadFile(event.target.files[0])
    //       .then((resp) => {
    //         setUrl(resp);
    //         setFileInfo({ fileInfo: event.target.files[0].type });
    //       })
    //       .catch((err) => {
    //         console.log("ERROR ", err);
    //       });
  };
  const getEditorType = () => {
    switch (contentType) {
      case "HTML":
        return (
          <React.Fragment>
            <Editor
              style={{ height: "120px" }}
              value={content}
              onTextChange={(e) => {
                setContent(e.htmlValue);
              }}
            />
          </React.Fragment>
        );
        break;
      case "YOUTUBE":
        return (
          <React.Fragment>
            <InputText
              placeholder="Title"
              onChange={(e) => {
                //setTitle(e.target.value);
              }}
            />
            <InputText
              placeholder="YOUTUBE URL"
              onChange={(e) => {
                setUrl(e.target.value);
                content(e.target.value);
              }}
            />
          </React.Fragment>
        );
        break;
      case "FILE":
        return (
          <React.Fragment>
            <InputText
              placeholder="Title"
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
          </React.Fragment>
        );
        break;
      case "TEXT":
        break;
    }
  };
  const getButton = (index) => {
    switch (props.questionType) {
      case "SC":
        return (
          <RadioButton
            inputId={"opt1" + index}
            name={"Option" + (index + 1)}
            value={index}
            onChange={(e) => {
              setOptionindex(e.value);
              let myoptionData = props.optionData;
              myoptionData[e.value] = {
                ...myoptionData[e.value],
                isCorrect: true,
              };
              props.setOptionData(myoptionData);
            }}
            checked={optionindex === index}
          />
        );
        break;
      case "MCQ":
        return (
          <React.Fragment>
            <Checkbox
              inputId={"opt1" + index}
              name={"Option" + (index + 1)}
              value={index}
              onChange={onChangeMCQ}
              checked={mcqCorrect.indexOf(index) !== -1}
            ></Checkbox>
          </React.Fragment>
        );
        break;
      case "TF":
        return (
          <RadioButton
            inputId={"opt1" + index}
            name={"Option" + (index + 1)}
            value={index}
            onChange={(e) => {
              setOptionindex(e.value);
              let myoptionData = props.optionData;
              myoptionData[e.value] = {
                ...myoptionData[e.value],
                isCorrect: true,
              };
              props.setOptionData(myoptionData);
            }}
            checked={optionindex === index}
          />
        );
        break;
    }
  };
  const getCardForOption = (data, index) => {
    return (
      <div className="p-col-12 p-lg-3" key={index}>
        <div className="card" key={index}>
          <h1 style={{ fontSize: "16px" }}>{"Option" + index}</h1>
          {ReactHtmlParser(data)}
          {getButton(index)}
          <label htmlFor={index} className="p-radiobutton-label">
            isCorrect?
          </label>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <Card header={header}>{getEditorType()}</Card>
      <h1>Question Type {props.questionType}</h1>
      <div className="p-grid p-fluid">
        {props.optionData
          ? props.optionData.map((option, index) => {
              return getCardForOption(option.data, index);
            })
          : ""}
      </div>
    </React.Fragment>
  );
}
