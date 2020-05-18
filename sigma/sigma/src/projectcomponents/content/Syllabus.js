import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";
import { TreeViewContentCreation } from "./TreeViewContentCreation";
import { Formulas } from "../formulas/Formulas";

export default function Syllabus(props) {
  const [contentLevel, setContentLevel] = useState("SUBJECT");
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-clone",
    },
  ];
  const [contentTitle, setContentTitle] = useState("HardCodedSubject");
  const [treeData, setTreeData] = useState(null);

  const [itemVal, setItemVal] = useState(items);
  const [contentTypeVal, setContentTypeVal] = useState("HTML");
  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_SUBJECT_BY_ID,
    {
      variables: { id: props.subjectid },
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

  return (
    <div className="p-grid p-fluid">
      <div className="p-col-12 p-lg-4">
        <TreeViewContentCreation
          items={itemVal}
          unitData={unitData.getSubjectById}
          setContentLevel={setContentLevel}
          setContentTitle={setContentTitle}
          setTreeData={setTreeData}
          subjectid={props.subjectid}
        />
      </div>
      <div className="p-col-12 p-lg-8">
        <Formulas />
      </div>
    </div>
  );
}
