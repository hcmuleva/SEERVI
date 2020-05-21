import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FormulaTreeView } from "../formulas/FormulaTreeView";
import { GET_ALLFORMULA_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import OptionalField from "../common/OptionalField";
import { FormulaCreation } from "./FormulaCreation";
import PreviewController from "../content/preview/PreviewController";
import { Accordion, AccordionTab } from "primereact/accordion";
import StudentSubjectView from "../student/StudentSubjectView";
export function Formulas(props) {
  const subjectid = props.match.params.id;
  const [contentLevel, setContentLevel] = useState("SUBJECT");
  const [itemVal, setItemVal] = useState(items);
  const [contentTypeVal, setContentTypeVal] = useState("HTML");
  const [contentType, setContentType] = useState([
    { label: "HTML", value: "HTML" },
    { label: "YOUTUBE", value: "YOUTUBE" },
    { label: "FILE", value: "FILE" },
  ]);

  const [treeData, setTreeData] = useState(null);
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-clone",
    },
  ];

  const [state, setState] = useState("ACTIVE");
  const [status, setStatus] = useState("APPROVED");
  const [level, setLevel] = useState(1);
  const [available, setAvailable] = useState("FREE");
  const [dataList, setDataList] = useState(null);
  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_ALLFORMULA_SUBJECT_BY_ID,
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
  console.log("GET_ALLFORMULA_SUBJECT_BY_ID ", unitData, "treeData ", treeData);

  if (!treeData) {
    console.log("TREE DATA is NULL");
    // setDataList(unitData.getSubjectById.formulas);
    console.log("PREVIEW SUBJECT  DATA ", unitData.getSubjectById.formulas);
  } else {
    console.log("PREVIEW UNIT and Topic Level Data", treeData);
  }
  console.log("contentLevel", contentLevel);
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
            <FormulaTreeView
              items={itemVal}
              unitData={unitData.getSubjectById}
              setContentLevel={setContentLevel}
              setTreeData={setTreeData}
              subjectid={subjectid}
            />
          )}
        </div>
      </div>

      <div className="card card-w-title" style={{ marginLeft: "10px" }}>
        <Button
          label={treeData ? treeData.level : "SUBJECT"}
          disabled="disabled"
          className="p-button p-button-secondary"
          style={{
            textAlign: "center",
            marginTop: ".3em",
            marginLeft: ".3em",
            width: "10em",
          }}
        />

        <OptionalField
          contentTypeVal={contentTypeVal}
          setContentTypeVal={setContentTypeVal}
          state={state}
          setState={setState}
          status={status}
          setStatus={setStatus}
          level={level}
          setLevel={setLevel}
          available={available}
          setAvailable={setAvailable}
        />

        <Accordion
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <AccordionTab>
            {" "}
            <FormulaCreation
              contentTypeVal={contentTypeVal}
              treeData={treeData}
              subjectid={subjectid}
            />
          </AccordionTab>
          <AccordionTab header="Preview Formulas">
            {treeData ? (
              treeData.dataval && treeData.dataval.formulas ? (
                <PreviewController
                  dataList={treeData.dataval.formulas}
                  viewType="CARD"
                />
              ) : (
                ""
              )
            ) : (
              <PreviewController
                dataList={unitData.getSubjectById.formulas}
                viewType="CARD"
              />
            )}
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}
