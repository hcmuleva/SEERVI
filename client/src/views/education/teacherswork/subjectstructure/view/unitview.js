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
import { GET_UNIT_BY_ID } from "../../../../../graphql/queries/education/unit";
import TopicCard from "./topiccard";
import TopicDialog from "./topicDialog";
import Contentview from "./contentview";
export default function Unitview(props) {
  const {
    loading: topicLoading,
    error: topicError,
    data: topicData,
  } = useQuery(GET_UNIT_BY_ID, {
    variables: { id: props.unitid },
  });
  if (topicError) return <p>Unit ERROR: {topicError.message}</p>;
  if (topicData === undefined) return <p>ERROR in GETTing topic</p>;
  if (topicLoading) {
    return <div>UnitData Loading</div>;
  }
  console.log("TOPIIC DATA ", topicData);
  return (
    <Container fluid className="main-content-container px-4">
      <TopicDialog unitid={props.unitid} />
      <Row key={111}>
        {topicData.getUnitById.topics.map((topic, idx) => (
          <TopicCard topic={topic} idx={idx} />
        ))}
      </Row>
      <Row key={112}>
        {topicData.getUnitById.contents.map((content, idx) => (
          <Contentview content={content} idx={idx} />
        ))}
      </Row>
    </Container>
  );
}
