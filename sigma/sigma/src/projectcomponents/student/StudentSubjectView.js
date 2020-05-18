import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card } from "primereact/card";
import { MY_ASSIGNED_SUBJECTS } from "../../service/graphql/education/common/queries/assignedsubjects";
import StudentSubjectCard from "./StudentSubjectCard";
export default function StudentSubjectView() {
  const myrole = "TEACHER";
  const {
    loading: assignedSubjectsLoading,
    error: assignedSubjectsError,
    data: assignedSubjectsData,
  } = useQuery(MY_ASSIGNED_SUBJECTS);
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

  return (
    <div>
      {mySubjectList.map((subject, index) => {
        return <StudentSubjectCard key={index} subject={subject} />;
      })}
    </div>
  );
}
