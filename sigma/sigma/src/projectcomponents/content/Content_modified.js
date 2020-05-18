import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Link } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
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
import { QuestionBank } from "../questionBank/QuestionBank";
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
  const [createUnit] = useMutation(CREATE_UNIT);
  const [createTopic] = useMutation(CREATE_TOPIC);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabActiveIndex, setTabActiveIndex] = useState(0);
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
      case "QUESTIONBANK":
        return (
          <QuestionBank
            contentTypeVal={contentTypeVal}
            treeData={treeData}
            materialTypeVal={materialTypeVal}
          />
        );
        break;
      case "EXAM":
        break;
      case "FORMULAS":
        return (
          <Formulas
            contentTypeVal={contentTypeVal}
            treeData={treeData}
            materialTypeVal={materialTypeVal}
            subjectid={subjectid}
          />
        );
        break;
      case "TIPS&TRICKS":
        break;
      case "PAPERS":
        break;
    }
  };
  console.log("treeData", treeData);

  return (
    <div className="p-grid">
      <div className="p-col-12 p-lg-12 p-md-12">
        <div className="p-grid p-fluid">
          <div className="p-col-12 p-lg-4">
            <TabView
              activeIndex={tabActiveIndex}
              onTabChange={(e) => setTabActiveIndex(e.index)}
            >
              <TabPanel header="Content">
                {" "}
                <TreeViewContentCreation
                  items={itemVal}
                  unitData={unitData.getSubjectById}
                  setContentLevel={setContentLevel}
                  setContentTitle={setContentTitle}
                  setTreeData={setTreeData}
                  subjectid={subjectid}
                />
              </TabPanel>
              <TabPanel
                header="Formula"
                icon="pi pi-check"
                headerClassName="p-warning"
              >
                Content II
              </TabPanel>
              <TabPanel header="Tricks">Content II</TabPanel>
              <TabPanel header="Paper">Content III</TabPanel>
            </TabView>
          </div>
          <div className="p-col-12 p-lg-8">
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
                  <StudentSubjectView />
                </AccordionTab>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
