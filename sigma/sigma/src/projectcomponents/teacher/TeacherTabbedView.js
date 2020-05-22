import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import Syllabus from "./Syllabus/Syllabus";
import { Question } from "../question/Question";
import { Content } from "../content/Content";
import { Example } from "../example/Example";
import { Formulas } from "../formulas/Formulas";
import { TipsTrics } from "../tipstricks/TipsTrics";
import { Exams } from "../exams/Exams";
export function TeacherTabbedView(props) {
  const subjectid = props.match.params.id;
  const [activeItem, setActiveItem] = useState("Syllabus");

  const items = [
    { label: "Syllabus", icon: "pi pi-fw pi-home" },
    { label: "Content", icon: "pi pi-fw pi-calendar" },
    { label: "Question", icon: "pi pi-fw pi-pencil" },
    { label: "TipsTricks", icon: "pi pi-fw pi-file" },
    { label: "Formulas", icon: "pi pi-fw pi-cog" },
    { label: "Examples", icon: "pi pi-fw pi-cog" },
    { label: "Exams", icon: "pi pi-fw pi-cog" },
    { label: "Papers", icon: "pi pi-fw pi-cog" },
  ];
  const getComponent = () => {
    switch (activeItem) {
      case "Syllabus":
        return <Syllabus subjectid={subjectid} />;

      case "Content":
        return <Content subjectid={subjectid} />;
        break;
      case "Question":
        return <Question subjectid={subjectid} />;
        break;
      case "TipsTricks":
        return <TipsTrics subjectid={subjectid} />;
        break;
      case "Formulas":
        return <Formulas subjectid={subjectid} />;
        break;
      case "Examples":
        return <Example subjectid={subjectid} />;
        break;
      case "Exams":
        return <Exams subjectid={subjectid} />;

        break;
      case "Papers":
        break;
    }
  };
  return (
    <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12 p-lg-12">
        <div className="content-section implementation">
          <TabMenu
            model={items}
            activeItem={activeItem}
            onTabChange={(e) => {
              console.log("activeItem", e.value.label);
              setActiveItem(e.value.label);
            }}
          />
        </div>
      </div>
      <div className="p-col-12 p-md-12 p-lg-12">{getComponent()}</div>
    </div>
  );
}
