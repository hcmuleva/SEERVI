import React, { useState } from "react";
import ContentCreator from "./content/contentCreator";
import ContentForm from "./content/form";
import { useQuery } from "@apollo/react-hooks";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import EditorView from "./content/editorChoiceMenu";
import { GET_SUBJECT_BY_ID } from "../../../../graphql/queries/education/subject";
import { GET_UNIT_BY_ID } from "../../../../graphql/queries/education/unit";
import { GET_TOPIC_BY_ID } from "../../../../graphql/queries/education/topic";
import { MY_ASSIGNED_SUBJECTS } from "../../../../graphql/queries/users/user";
import SubjectSelection from "./selection/subjectSelector";
import TreeViewSubject from "./selection/treeview";

import { Container, Row, Col } from "shards-react";

import PageTitle from "../../../../components/common/PageTitle";
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
  const [compLevel, setCompLevel] = useState(null);
  const [id, setId] = useState(null);
  console.log("selectedSubject", selectedSubject);
  const getComponent = (complevel, id) => {
    switch (complevel) {
      case "SUBJECT":
        return (
          <ContentCreator
            subjectid={id}
            query={{ query: GET_SUBJECT_BY_ID, variables: { id: id } }}
          />
        );
      case "UNIT":
        return (
          <ContentCreator
            unitid={id}
            query={{ query: GET_UNIT_BY_ID, variables: { id: id } }}
          />
        );
      case "TOPIC":
        return (
          <ContentCreator
            topicid={id}
            query={{ query: GET_TOPIC_BY_ID, variables: { id: id } }}
          />
        );
    }
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Content Management"
            subtitle="Content Creation"
            className="text-sm-left"
          />
        </Row>

        <Row>
          {/* Editor */}
          <Col lg="3" md="12">
            <TreeViewSubject
              mySubjectList={mySubjectList}
              setId={setId}
              setCompLevel={setCompLevel}
            />
          </Col>

          {/* Sidebar Widgets */}
          <Col lg="9" md="12">
            {compLevel ? (
              <PageTitle
                sm="4"
                title={compLevel}
                subtitle="You are creating content in"
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
