import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

import { TabMenu } from "primereact/tabmenu";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { Button } from "primereact/button";

import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { QuestionTreeView } from "./QuestionTreeView";
import { GET_ALLQUESTIONS_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import { CREATE_QUESTION } from "../../service/graphql/education/teacher/mutations/question";

import Options from "./Options";
import QuestionContent from "./QuestionContent";
import Explaination from "./Explaination";
import S3UploadFile from "../../common/S3UploadFile";

export function Question(props) {
  const items = [
    {
      label: "Question",
      icon: "pi pi-question",
    },
    {
      label: "Options",
      icon: "pi pi-fw pi-sitemap",
    },
  ];
  const [optionData, setOptionData] = useState([]);

  const subjectid = props.subjectid ? props.subjectid : props.match.params.id;
  const [title, setTitle] = useState(null);
  const [contentLevel, setContentLevel] = useState("SUBJECT");
  const [level, setLevel] = useState(null);
  const [questionContent, setQuestionContent] = useState("");
  const [activeItem, setActiveItem] = useState("Question");
  const [treeData, setTreeData] = useState(null);
  const [dataList, setDataList] = useState(null);
  const [questionType, setQuestionType] = useState("SC");
  const [createQuestion] = useMutation(CREATE_QUESTION);

  const uploadFiles = () => {
    let myQueObj = {
      title: "",
      quetype: "",
      descrtionType: "HTML",
      descrtionurl: "",
      options: [],
      level: 1,
      isPublished: true,
      state: "ACTIVE",
      status: "APPROVED",
      available: "FREE",
      descriptionfileInfo: {},
    };
    let modifiedData = [...optionData];
    optionData.map((opt, index) => {
      const file = new File([opt.data], "HARDCODEDFILENAME.html", {
        type: "text/html",
      });
      S3UploadFile(file).then((resp) => {
        modifiedData[index] = { ...optionData[index], url: resp };
      });
    });
    const quefile = new File([questionContent], "HARDCODEDFILENAME.html", {
      type: "text/html",
    });
    S3UploadFile(quefile).then((resp) => {
      myQueObj["descrtionurl"] = resp;
    });
    if (!treeData) {
      myQueObj["subject"] = subjectid;
    } else {
      if (treeData && "UNIT" === treeData.type) {
        console.log("SET UNIT LEVEL ");
        myQueObj["unit"] = treeData.id;
      } else if (treeData && "TOPIC" === treeData.type) {
        console.log("SET TOPIC LEVEL ");
        myQueObj["topic"] = treeData.id;
      }
    }
    myQueObj["title"] = title ? title : "NEEDTOUPDATE";
    myQueObj["level"] = level ? level : 1;
    myQueObj["quetype"] = questionType;
    myQueObj["options"] = modifiedData;
    myQueObj["descriptionType"] = "This is HARD CODED VALUE";
    console.log("myQueObj", myQueObj);

    createQuestion({
      variables: myQueObj,
      refetchQueries: [
        {
          query: GET_ALLQUESTIONS_SUBJECT_BY_ID,
          variables: { id: subjectid },
        },
      ],
    }).then((res) => {
      console.log("Created content", res);
      resetData();
    });
  };
  const resetData = () => {
    setTitle("");
    setQuestionContent("");
  };
  const getComponent = () => {
    console.log("activeItem", activeItem);
    switch (activeItem) {
      case "Question":
        return (
          <QuestionContent
            questionContent={questionContent}
            setQuestionContent={setQuestionContent}
          />
        );
        break;
      case "Options":
        return (
          <Options
            questionType={questionType}
            optionData={optionData}
            setOptionData={setOptionData}
          />
        );

      case "Explaination":
        return <Explaination />;
    }
  };
  const levelList = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];
  const questionTypeList = [
    { label: "MCQ", value: "MCQ" },
    { label: "SC", value: "SC" },
    { label: "T/F", value: "TF" },
    { label: "SUB", value: "Subjective" },
  ];
  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_ALLQUESTIONS_SUBJECT_BY_ID,
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

  return (
    <div className="p-grid ">
      <div
        className="card card-w-title"
        style={{ marginLeft: "20px", marginRiight: "1 0px" }}
      >
        <div
          className="content-section introduction"
          style={{ marginLeft: "5px" }}
        >
          {unitLoading ? (
            <div>Loading ....</div>
          ) : (
            <QuestionTreeView
              unitData={unitData.getSubjectById}
              setContentLevel={setContentLevel}
              setTreeData={setTreeData}
              subjectid={subjectid}
            />
          )}
        </div>
      </div>

      <div className="card card-w-title" style={{ marginLeft: "2px" }}>
        <Button
          label={treeData ? treeData.level : "SUBJECT"}
          disabled="disabled"
          className="p-button p-button-secondary"
          style={{
            textAlign: "center",
            marginTop: ".3em",
            marginLeft: ".2em",
            width: "10em",
          }}
        />
        <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-6 p-lg-6">
            <TabMenu
              model={items}
              activeItem={activeItem}
              onTabChange={(e) => {
                console.log("ACTIVE ITEM ", e.value.label);
                setActiveItem(e.value.label);
              }}
            />
          </div>
          <div className="p-col-12 p-md-4 p-lg-2">
            <Dropdown
              placeholder="Level"
              options={levelList}
              value={level}
              onChange={(event) => setLevel(event.value)}
              autoWidth={true}
            />
          </div>
          <div className="p-col-12 p-md-3 p-lg-2">
            <Dropdown
              placeholder="QueType"
              options={questionTypeList}
              value={questionType}
              onChange={(event) => setQuestionType(event.value)}
              autoWidth={true}
            />
          </div>
        </div>
        <InputText
          placeholder="Title"
          style={{ width: 350, height: 50, textAlign: "center" }}
          onChange={(e) => {
            console.log("E ", e.target.value);
            setTitle(e.target.value);
          }}
        />
        {getComponent()}
        <h1></h1>
        <Button
          label="SAVE"
          className="p-button-Primary"
          icon="pi pi-check"
          onClick={() => {
            uploadFiles();
          }}
        />
        <Button
          label="CANCEL"
          className="p-button-warning"
          icon="pi pi-times"
        />
      </div>
    </div>
  );
}
