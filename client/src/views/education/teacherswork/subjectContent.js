import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Container, Row, Col } from "shards-react";

import { GET_SUBJECT_BY_ID } from "../../../graphql/queries/education/subject";
import { GET_UNIT_BY_ID } from "../../../graphql/queries/education/unit";
import { GET_TOPIC_BY_ID } from "../../../graphql/queries/education/topic";
import { MY_ASSIGNED_SUBJECTS } from "../../../graphql/queries/users/user";
import EditorView from "./content/editorChoiceMenu";
import SubjectSelection from "./content/selection/subjectSelector";
import TreeViewSubject from "./content/selection/treeview";
import ContentCreator from "./content/content_newdesign/content/contentCreator";
import ContentForm from "./content/form";
import PageTitle from "../../../components/common/PageTitle";
import DataTypeRadio from "./content/questioinn_newdesign/DataTypeRadio";
import Question from "./content/content_newdesign/question/Question";
import TIPSTRICKS from "./content/content_newdesign/tipstricks/tipstricksCreator";
import Formula from "./content/content_newdesign/formula/formulaCreator";
import Example from "./content/content_newdesign/example/exampleCreator";

export default function SubjectContent(props) {
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
    if (("TEACHER", sub.subscribedAs.name)) {
      console.log("SUBJECTS ", sub.mySubjects);
      mySubjectList = [...mySubjectList, ...sub.mySubjects];
    }
  });
  console.log("MY_ASSIGNED_SUBJECTS ", mySubjectList);
  const query = (id) => {
    return { query: GET_SUBJECT_BY_ID, variables: { id: id } };
  };

  const [selectedSubject, setSelectedSubject] = useState("");

  const myInitialSubjectId =
    mySubjectList && mySubjectList.length > 0 ? mySubjectList[0].id : null;
  const myInitialCompLevel =
    mySubjectList && mySubjectList.length > 0 ? "SUBJECT" : null;

  const [compLevel, setCompLevel] = useState(myInitialCompLevel);
  const [name, setName] = useState("");
  const [id, setId] = useState(myInitialSubjectId);
  const [datatype, setDatatype] = useState("CONTENT");
  console.log("selectedSubject", selectedSubject);
  const getComponent = (complevel, id) => {
    switch (complevel) {
      case "SUBJECT":
        switch (datatype) {
          case "CONTENT":
            return (
              <ContentCreator
                subjectid={id}
                componentLevel={compLevel}
                query={{ query: GET_SUBJECT_BY_ID, variables: { id: id } }}
              />
            );
          case "EXAMPLE":
            return (
              <Example
                subjectid={id}
                componentLevel={compLevel}
                query={{ query: GET_SUBJECT_BY_ID, variables: { id: id } }}
              />
            );
          case "FORMULA":
            return (
              <Formula
                subjectid={id}
                componentLevel={compLevel}
                query={{ query: GET_SUBJECT_BY_ID, variables: { id: id } }}
              />
            );
          case "TIPSTRICKS":
            return (
              <TIPSTRICKS
                subjectid={id}
                componentLevel={compLevel}
                query={{ query: GET_SUBJECT_BY_ID, variables: { id: id } }}
              />
            );
          case "QUESTION":
            return (
              <Question
                subjectid={id}
                componentLevel={compLevel}
                query={{ query: GET_SUBJECT_BY_ID, variables: { id: id } }}
              />
            );
        }

      case "UNIT":
        switch (datatype) {
          case "CONTENT":
            return (
              <ContentCreator
                unitid={id}
                componentLevel={compLevel}
                query={{ query: GET_UNIT_BY_ID, variables: { id: id } }}
              />
            );
          case "EXAMPLE":
            return (
              <Example
                unitid={id}
                componentLevel={compLevel}
                query={{ query: GET_UNIT_BY_ID, variables: { id: id } }}
              />
            );
          case "FORMULA":
            return (
              <Formula
                unitid={id}
                componentLevel={compLevel}
                query={{ query: GET_UNIT_BY_ID, variables: { id: id } }}
              />
            );
          case "TIPSTRICKS":
            return (
              <TIPSTRICKS
                unitid={id}
                componentLevel={compLevel}
                query={{ query: GET_UNIT_BY_ID, variables: { id: id } }}
              />
            );
          case "QUESTION":
            return (
              <Question
                unitid={id}
                componentLevel={compLevel}
                query={{ query: GET_UNIT_BY_ID, variables: { id: id } }}
              />
            );
        }

      case "TOPIC":
        switch (datatype) {
          case "CONTENT":
            return (
              <ContentCreator
                topicid={id}
                componentLevel={compLevel}
                query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
              />
            );
          case "EXAMPLE":
            return (
              <Example
                topicid={id}
                componentLevel={compLevel}
                query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
              />
            );
          case "FORMULA":
            return (
              <Formula
                topicid={id}
                componentLevel={compLevel}
                query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
              />
            );
          case "TIPSTRICKS":
            return (
              <TIPSTRICKS
                topicid={id}
                componentLevel={compLevel}
                query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
              />
            );
          case "QUESTION":
            return (
              <Question
                topicid={id}
                componentLevel={compLevel}
                query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
              />
            );
        }
    }
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            subtitle="Content Creation"
            className="text-sm-left"
          />
        </Row>

        <Row>
          {/* Editor */}
          <Col lg="3" md="12">
            <TreeViewSubject
              mySubjectList={mySubjectList}
              setName={setName}
              setId={setId}
              setCompLevel={setCompLevel}
              datatype={datatype}
              setDatatype={setDatatype}
            />
          </Col>

          {/* Sidebar Widgets */}

          <Col lg="9" md="12">
            <DataTypeRadio datatype={datatype} setDatatype={setDatatype} />
            {compLevel ? (
              <PageTitle
                sm="4"
                subtitle={"Content " + compLevel + ": " + name}
                className="text-sm-left"
              />
            ) : (
              ""
            )}
            {compLevel ? getComponent(compLevel, id) : ""}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
