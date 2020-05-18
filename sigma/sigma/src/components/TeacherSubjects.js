import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";

import { Button } from "primereact/button";
import { ContentTypes } from "../projectcomponents/contenttypes";
import { MY_ASSIGNED_SUBJECTS } from "../service/graphql/education/common/queries/assignedsubjects";
import { Subjectcard } from "../projectcomponents/Subjectcard";
export default function TeacherSubjects() {
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
  let username = "TEACHER:";

  assignedSubjectsData.mySubscription.map((sub) => {
    if (("TEACHER", sub.subscribedAs.name)) {
      username =
        sub.userid.firstname +
        " " +
        sub.userid.lastname +
        " , " +
        sub.userid.email;
      mySubjectList = [...mySubjectList, ...sub.mySubjects];
    }
  });

  return (
    <div className="p-grid p-nogutter">
      {mySubjectList.map((subject, index) => {
        return (
          <Subjectcard
            key={index}
            subject={subject}
            username={username}
            type="SUBJECT"
          />
        );
      })}
    </div>
  );
}
