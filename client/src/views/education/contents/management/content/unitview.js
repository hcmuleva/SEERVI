import React, { useState } from "react";
import ReactPlayer from "react-player";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Buttons,
} from "shards-react";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import UnitDialog from "./unitDialog";
import TopicView from "./topicView";
import { GET_SUBJECT_BY_ID } from "../../../../../graphql/queries/education/subject";

import { useQuery } from "@apollo/react-hooks";

export default function Unitview(props) {
  const [isUnitView, setIsUnitView] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(null);
  console.log("HCM UNITVIIEW PROPS ", props);

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const action = (act) => {
    console.log(" ACTION ", act);
  };
  const {
    loading: unitLoading,
    error: unitError,
    data: unitData,
  } = useQuery(GET_SUBJECT_BY_ID, {
    variables: { id: props.selectedSubject.id },
  });
  if (unitError) return <p>Unit ERROR: {unitError.message}</p>;
  if (unitData === undefined) return <p>ERROR in GETTing unit</p>;
  if (unitLoading) {
    return <div>UnitData Loading</div>;
  }
  console.log("Unit DATA ", unitData.getSubjectById.units);
  return (
    <div>
      {isUnitView ? (
        <Row>
          <UnitDialog selectedSubject={props.selectedSubject} />

          {unitData.getSubjectById.units.map((unit, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post mb-4">
                {unit.name === "YOUTUBE" ? (
                  <ReactPlayer
                    className="react-player"
                    url={unit.picture}
                    width="100%"
                    height="100%"
                    config={{
                      file: { attributes: { disablepictureinpicture: "true" } },
                    }}
                  />
                ) : (
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url('${unit.picture}')` }}
                  />
                )}
                <CardHeader className="text-muted border-top py-3">
                  <button
                    onClick={() => {
                      setSelectedUnit(unit);
                      setIsUnitView(false);
                    }}
                  >
                    Topics
                  </button>
                </CardHeader>
                <CardBody>
                  <h5 className="card-title">
                    <div className="text-fiord-blue" href="#">
                      {unit.name}
                    </div>
                  </h5>
                  <p className="card-text">{unit.description}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <Row>
                    <Col>
                      <Chip
                        variant="outlined"
                        size="small"
                        avatar={<Avatar alt="Natacha" src={unit.picture} />}
                        label="BookMark"
                        onDelete={handleDelete}
                        onClick={() => {
                          action("BookMark");
                        }}
                      />

                      <Chip
                        variant="outlined"
                        size="small"
                        avatar={<Avatar alt="Natacha" src={unit.picture} />}
                        label="Que"
                        onDelete={handleDelete}
                        onClick={() => {
                          action("QUESTION");
                        }}
                      />
                    </Col>
                    <Col>
                      <Chip
                        variant="outlined"
                        size="small"
                        avatar={<Avatar alt="Natacha" src={unit.picture} />}
                        label="Examples"
                        onDelete={handleDelete}
                        onClick={() => {
                          action("EXAMPLE");
                        }}
                      />
                      <Chip
                        variant="outlined"
                        size="small"
                        avatar={<Avatar alt="Natacha" src={unit.picture} />}
                        label="Doubts"
                        onDelete={handleDelete}
                        onClick={() => {
                          action("DOUBT");
                        }}
                      />
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <TopicView unitid={selectedUnit} subjectid={props.selectedSubject.id} />
      )}
    </div>
  );
}
