import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Inplace, InplaceDisplay, InplaceContent } from "../common/Inplace";
import { TreeViewContentCreation } from "./TreeViewContentCreation";
import { GET_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import { CREATE_UNIT } from "../../service/graphql/education/teacher/mutations/unit";
import { CREATE_TOPIC } from "../../service/graphql/education/teacher/mutations/topic";
import { GET_UNIT_BY_ID } from "../../service/graphql/education/common/queries/unit";
import { UnitCreateDialog } from "./UnitCreateDialog";
import { Material } from "../material/Material";
import { Formulas } from "../formulas/Formulas";
import { Question } from "../question/Question";
import { Exam } from "../exams/Exams";
import { TipsTrics } from "../tipstricks/TipsTrics";
import { Papers } from "../papers/Papers";
import { Accordion, AccordionTab } from "primereact/accordion";
import StudentSubjectView from "../student/StudentSubjectView";
export function Content(props) {
  const subjectid = props.match.params.id;
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
    { label: "Question", value: "Question" },
    { label: "EXAMS", value: "EXAMS" },
    { label: "FORMULAS", value: "FORMULAS" },
    { label: "TIPS&TRICKS", value: "TIPS&TRICKS" },
    { label: "PAPERS", value: "PAPERS" },
  ]);
  const [contentTitle, setContentTitle] = useState(props.match.params.name);
  const [createText, setCreateText] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [inline, setInline] = useState(null);
  const [createUnit] = useMutation(CREATE_UNIT);
  const [createTopic] = useMutation(CREATE_TOPIC);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-clone",
    },
  ];

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
  const header = (
    <div>
      <h1>{contentLevel + ":" + contentTitle}</h1>
      <h3>Advanced</h3>
    </div>
  );

  const materialTypeComponent = () => {
    switch (materialTypeVal) {
      case "MATERIAL":
        return (
          <Material
            contentTypeVal={contentTypeVal}
            treeData={treeData}
            materialTypeVal={materialTypeVal}
            subjectid={subjectid}
          />
        );
        break;
      case "Question":
        return (
          <Question
            contentTypeVal={contentTypeVal}
            treeData={treeData}
            materialTypeVal={materialTypeVal}
          />
        );
        break;
      case "EXAM":
        break;
      case "FORMULAS":
        return {
          /*  <Formulas
            contentTypeVal={contentTypeVal}
            treeData={treeData}
            materialTypeVal={materialTypeVal}
            subjectid={subjectid}
          /> */
        };
        break;
      case "TIPS&TRICKS":
        break;
      case "PAPERS":
        break;
    }
  };
  console.log("treeData", treeData);

  return (
    <div className="p-grid ">
      <div className="card card-w-title" style={{ marginLeft: "10px" }}>
        <Inplace closable={true}>
          <InplaceDisplay>
            <span
              className="pi pi-plus"
              style={{ verticalAlign: "middle" }}
            ></span>
            {treeData && "UNIT" === treeData.type ? "TOPIC" : "UNIT"}
          </InplaceDisplay>

          <InplaceContent>
            <InputText
              id="in1"
              value={createText}
              autoFocus
              onChange={(e) => {
                setCreateText(e.target.value);
              }}
            />
            <Button
              icon="pi pi-check"
              onClick={() => {
                console.log("THIS IS TO CREATE UNIT", createText);
                if (treeData && "UNIT" === treeData.type) {
                  createTopic({
                    variables: {
                      name: createText,
                      unit: treeData.id,
                    },
                    refetchQueries: () => [
                      {
                        query: GET_SUBJECT_BY_ID,
                        variables: { id: subjectid },
                      },
                    ],
                  })
                    .then((res) => {
                      console.log("Created TopicResep", res);
                      setCreateText("");
                      //setDialogState(false);
                    })
                    .catch((err) => {
                      throw new Error("Error in creating Unit");
                    });
                } else {
                  createUnit({
                    variables: {
                      name: createText,
                      subject: subjectid,
                    },
                    refetchQueries: () => [
                      {
                        query: GET_SUBJECT_BY_ID,
                        variables: { id: subjectid },
                      },
                    ],
                  })
                    .then((res) => {
                      console.log("Created Unit", res);
                      setCreateText("");
                      //setDialogState(false);
                    })
                    .catch((err) => {
                      throw new Error("Error in creating Unit");
                    });
                }
              }}
            />
          </InplaceContent>
        </Inplace>

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
        <Accordion
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <AccordionTab>{materialTypeComponent()}</AccordionTab>
          <AccordionTab header="Preview">
            {/* <div>
              <ReactPlayer
                className="react-player"
                url={"https://www.youtube.com/watch?v=m5VbK66a254&t=11s"}
                controls={true}
                light={true}
                playbackRate={1}
                width="420px"
                height="280px"
              />

              <Iframe
                url="https://zbimages.s3-ap-southeast-1.amazonaws.com/12th/profile/cnC4UEo4kwDjQnsRKX2px6.html"
                width="450px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              />
            </div> */}
            <StudentSubjectView />
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}
