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
import { GET_TOPIC_BY_ID } from "../../../../../graphql/queries/education/topic";
import TopicDialog from "./topicDialog";
import Contentview from "./contentview";
export default function Topicview(props) {
  const {
    loading: topicLoading,
    error: topicError,
    data: topicData,
  } = useQuery(GET_TOPIC_BY_ID, {
    variables: { id: props.topicid },
  });
  if (topicError) return <p>Topic ERROR: {topicError.message}</p>;
  if (topicData === undefined) return <p>ERROR in GETTing topic</p>;
  if (topicLoading) {
    return <div>TopicData Loading</div>;
  }
  console.log("TOPIIC DATA ", topicData);
  return (
    <Container fluid className="main-content-container px-4">
      <TopicDialog topicid={props.topicid} />

      <Row key={112}>
        {topicData.getTopicById.contents.map((content, idx) => (
          <Contentview content={content} idx={idx} />
        ))}
      </Row>
    </Container>
  );
}
