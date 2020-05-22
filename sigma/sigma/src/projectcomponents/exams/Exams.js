import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card } from "primereact/card";
import { MY_ASSIGNED_SUBJECTS_QUE } from "../../service/graphql/education/common/queries/assignedsubjects";
import { ExamTreeView } from "./ExamTreeView";
export function Exams(props) {
  const myrole = "TEACHER";
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
  console.log("MY_ASSIGNED_SUBJECTS_QUE", mySubjectList);
  return (
    <div>
      <h1>Exam</h1>
      <ExamTreeView mySubjectList={mySubjectList} />
    </div>
  );
}
