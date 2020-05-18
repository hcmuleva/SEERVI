import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import Syllabus from "./Syllabus";
import Material from "./Material";
import Exams from "./Exams";
export default function TeacherMgmt(props) {
  const [compName, setCompName] = useState("SYLLABUS");
  const subjectid = "ck96ucd6b040l0884c0k16zrr";
  const getComponent = () => {
    switch (compName) {
      case "MATERIAL":
        return <Material />;
        break;
      case "SYLLABUS":
        return <Syllabus subjectid={subjectid} />;
        break;
      case "EXAMS":
        return <Exams />;
        break;
    }
  };
  return (
    <Toolbar>
      <div className="p-toolbar-group-left">
        <Button
          label="Syllabus"
          icon="pi pi-plus"
          className="p-button-info"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            setCompName("SYLLABUS");
          }}
        />
        <Button
          label="Material"
          icon="pi pi-money-bill"
          className="p-button-success"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            setCompName("MATERIAL");
          }}
        />
        <Button
          label="Exams"
          icon="pi pi-question"
          className="p-button-warning"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            setCompName("EXAMS");
          }}
        />
        {getComponent()}
      </div>
    </Toolbar>
  );
}
