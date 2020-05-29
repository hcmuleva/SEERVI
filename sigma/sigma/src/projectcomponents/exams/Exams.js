import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { Panel } from "primereact/panel";

import { MY_ASSIGNED_SUBJECTS_QUE } from "../../service/graphql/education/common/queries/assignedsubjects";
import { ExamTreeView } from "./ExamTreeView";
import QuestionAvailable from "./QuestionAvailable";
import SelectedQuetion from "./SelectedQuetion";
export function Exams(props) {
  const myrole = "TEACHER";
  const [avbQue, setAvbQue] = useState(null);
  const [activeItem, setActiveItem] = useState("QUEAVAILABLE");

  const {
    loading: assignedSubjectsLoading,
    error: assignedSubjectsError,
    data: assignedSubjectsData,
  } = useQuery(MY_ASSIGNED_SUBJECTS_QUE);
  if (assignedSubjectsError)
    return <p>SUBORG ERROR: {assignedSubjectsError.message}</p>;
  if (assignedSubjectsData === undefined)
    return <p>ERROR in GETTing assignedSubjects</p>;
  if (assignedSubjectsLoading) {
    return <div>SUBORG Loading</div>;
  }
  let mySubjectList = [];
  assignedSubjectsData.mySubscription.map((sub) => {
    if ((myrole, sub.subscribedAs.name)) {
      mySubjectList = [...mySubjectList, ...sub.mySubjects];
    }
  });
  const items = [
    { label: "QUEAVAILABLE", icon: "pi pi-fw pi-info-circle" },
    { label: "SELECTEDQUE", icon: "pi pi-fw pi-info" },
  ];
  const getComponent = () => {
    switch (activeItem) {
      case "QUEAVAILABLE":
        return;
        break;
      case "SELECTEDQUE":
        return <SelectedQuetion />;
    }
  };
  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-md-6 p-xl-3">
        <ExamTreeView mySubjectList={mySubjectList} setAvbQue={setAvbQue} />
      </div>
      <div className="p-col-12 p-md-6 p-xl-9">
        {avbQue ? (
          <QuestionAvailable avaialableQue={avbQue} />
        ) : (
          <h1>Select Question</h1>
        )}
      </div>
    </div>
  );
}
