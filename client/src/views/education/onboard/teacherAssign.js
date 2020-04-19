import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {GET_SUBJECTDATA} from "../../../graphql/queries/education/subjectsAssignment"

export default function TeacherAssign() {
    const subgroupid =localStorage.getItem('subgroup')
    console.log("subgroupid",subgroupid)
    const {
    loading: subjectAssignmentLoading,
    error: subjectAssignmentError,
    data: subjectAssignmentData,
  } = useQuery(GET_SUBJECTDATA,  { variables: { id: subgroupid } });
  if (subjectAssignmentError) return <p>ERROR: {subjectAssignmentError.message}</p>;
  if (subjectAssignmentData === undefined)
    return <p>ERROR in GETTing ssubjectAssignment BY ID</p>;
  if (subjectAssignmentLoading) {
    return <div>subjectAssignment Loading</div>;
  }
  console.log("subjectAssignmentData",subjectAssignmentData)
  return (
    <div>
      <h1>Teacher Assignment</h1>
      
  

    </div>
  );
}
