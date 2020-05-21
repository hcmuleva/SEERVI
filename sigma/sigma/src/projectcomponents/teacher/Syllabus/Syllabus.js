import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { GET_SUBJECT_SYLLABUS_BY_ID } from "../../../service/graphql/education/common/queries/subjects";
import { SyllabusTreeView } from "./SyllabusTreeView";

export default function Syllabus(props) {
  const subjectid = props.subjectid ? props.subjectid : props.match.params.id;

  const [treeData, setTreeData] = useState(null);
  const [contentLevel, setContentLevel] = useState("SUBJECT");
  const [syllabustitle, setSyllabustitle] = useState("UNIT");
  const setTitle = (type) => {
    switch (type) {
      case "SUBJECT":
        setSyllabustitle("UNIT");
      case "UNIT":
        setSyllabustitle("TOPIC");
    }
    console.log("TREE DATA IN SYLLABUS", treeData);
  };

  useEffect(() => {
    if (treeData) {
      setTitle(treeData.type);
    }
  }, [treeData]);
  const getAction = () => {
    console.log("ACTION TREE DATA", treeData);
    if (!treeData) return "UNIT";
    console.log("Returniing ", treeData.action);
    return treeData.action;
  };
  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_SUBJECT_SYLLABUS_BY_ID,
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
  const footer = (
    <span>
      <div
        style={{ marginTop: "30px", paddingLeft: "15em", paddingRight: "15em" }}
      >
        <Button label="Proceed" className="p-button-raised p-button-rounded" />
      </div>
    </span>
  );

  return (
    <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-4 p-lg-4">
        {" "}
        {unitLoading ? (
          <div>Loading ....</div>
        ) : (
          <SyllabusTreeView
            unitData={unitData.getSubjectById}
            setContentLevel={setContentLevel}
            setTreeData={setTreeData}
            subjectid={subjectid}
          />
        )}
      </div>
      <div className="p-col-12 p-md-6 p-lg-6">
        <Card footer={footer}>
          <div
            style={{
              marginTop: "30px",
              paddingLeft: "10em",
              paddingRight: "15em",
            }}
          >
            <InputText
              placeholder={"Enter " + getAction() + " or Section name "}
              style={{ width: 350, height: 50, textAlign: "center" }}
              onChange={(e) => {
                console.log("E ", e.target.value);
                setSyllabustitle(e.target.value);
              }}
            />
          </div>
        </Card>
      </div>
      <div className="p-col-12 p-md-2 p-lg-2"></div>
    </div>
  );
}
