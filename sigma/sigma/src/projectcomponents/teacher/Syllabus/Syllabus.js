import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { GET_SUBJECT_SYLLABUS_BY_ID } from "../../../service/graphql/education/common/queries/subjects";
import { CREATE_UNIT } from "../../../service/graphql/education/teacher/mutations/unit";
import { CREATE_TOPIC } from "../../../service/graphql/education/teacher/mutations/topic";

import { SyllabusTreeView } from "./SyllabusTreeView";

export default function Syllabus(props) {
  const subjectid = props.subjectid ? props.subjectid : props.match.params.id;

  const [treeData, setTreeData] = useState(null);
  const [contentLevel, setContentLevel] = useState("SUBJECT");
  const [createUnit] = useMutation(CREATE_UNIT);
  const [createTopic] = useMutation(CREATE_TOPIC);
  const [unittopicName, setUnittopicName] = useState("");

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
  console.log("TREE DATA", treeData);
  const footer = (
    <span>
      <div
        style={{ marginTop: "30px", paddingLeft: "15em", paddingRight: "15em" }}
      >
        <Button
          label="Create"
          className="p-button-raised p-button-rounded"
          onClick={() => {
            if (!treeData || (treeData && "SUBJECT" === treeData.type)) {
              createUnit({
                variables: {
                  name: unittopicName,
                  subject: subjectid,
                },
                refetchQueries: () => [
                  {
                    query: GET_SUBJECT_SYLLABUS_BY_ID,
                    variables: { id: subjectid },
                  },
                ],
              })
                .then((res) => {
                  setUnittopicName("");
                  console.log("Created Unit", res);

                  console.log("CLEARD AT UNIT LEVEL", unittopicName);
                })
                .catch((err) => {
                  throw new Error("Error in creating Unit");
                });
            } else if (treeData && "UNIT" === treeData.type) {
              createTopic({
                variables: {
                  name: unittopicName,
                  unit: treeData.id,
                },
                refetchQueries: () => [
                  {
                    query: GET_SUBJECT_SYLLABUS_BY_ID,
                    variables: { id: subjectid },
                  },
                ],
              })
                .then((res) => {
                  setUnittopicName("");
                  console.log(
                    "Created TopicResep",
                    res,
                    " clearn ",
                    unittopicName
                  );
                })
                .catch((err) => {
                  throw new Error("Error in creating Topic");
                });
            }
            setUnittopicName("");
          }}
        />
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
              placeholder="EnterName"
              value={unittopicName}
              style={{ width: 350, height: 50, textAlign: "center" }}
              onChange={(e) => {
                setUnittopicName(e.target.value);
              }}
            />
          </div>
        </Card>
      </div>
      <div className="p-col-12 p-md-2 p-lg-2"></div>
    </div>
  );
}
