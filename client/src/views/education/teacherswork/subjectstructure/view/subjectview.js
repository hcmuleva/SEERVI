import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
} from "shards-react";
import { GET_SUBJECT_BY_ID } from "../../../../../graphql/queries/education/subject";
import UnitCard from "./unitcard";
import UnitDialog from "./unitDialog";
import ContentView from "./contentview";
export default function Subjectview(props) {
  console.log("SUBBJECT VIEW  ", props);
  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_SUBJECT_BY_ID,
    {
      variables: { id: props.subjectid },
    }
  );
  if (unitError) return <p>Unit ERROR: {unitError.message}</p>;
  if (unitData === undefined) return <p>ERROR in GETTing unit</p>;
  if (unitLoading) {
    return <div>UnitData Loading</div>;
  }
  console.log("SUBJECT LEVEL UNIT OR CONTENT", unitData);
  return (
    <Container fluid className="main-content-container px-4">
      <UnitDialog subjectid={props.subjectid} />
      <Row key={111}>
        {unitData.getSubjectById.units.map((unit, idx) => (
          <UnitCard unit={unit} idx={idx} />
        ))}
      </Row>
      <Row key={112}>
        {unitData.getSubjectById.contents.map((content, idx) => (
          <ContentView content={content} idx={idx} />
        ))}
      </Row>
    </Container>
  );
}
