import React from "react";
import { MY_ASSIGNED_SUBJECTS } from "../../graphql/queries/users/user";
import { useQuery, useMutation } from "@apollo/react-hooks";
//import SingleLineGridList from "../education/contents/management/GridListView"
import TeacherView from "../education/teacherswork/teacherview";

export default function Teacher() {
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
  return (
    <div>
      <TeacherView subjectData={assignedSubjectsData.mySubscription} />
    </div>
  );
}
