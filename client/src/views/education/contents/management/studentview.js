import React, { useState } from "react";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Chip from "@material-ui/core/Chip";
import { Container, Row, Col } from "shards-react";
import { Card, CardBody, CardHeader, CardFooter } from "shards-react";
import Unitview from "./content/unitview";
export default function Studentview(props) {
  const [isSubjectView, setIsSubjectView] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  let mysubjects = [];
  props.subjectList.map((subs) => {
    mysubjects.push(...subs);
  });
  console.log("mysubjects", mysubjects);
  console.log("Props Studentview ", props.subjectList[0][0]);
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const action = (act) => {
    console.log(" ACTION ", act);
  };
  return (
    <Container fluid className="main-content-container px-4">
      {isSubjectView ? (
        <Row>
          {mysubjects.map((subject, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post mb-4">
                {subject.name === "YOUTUBE" ? (
                  <ReactPlayer
                    className="react-player"
                    url={subject.picture}
                    width="100%"
                    height="100%"
                    config={{
                      file: { attributes: { disablepictureinpicture: "true" } },
                    }}
                  />
                ) : (
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url('${subject.picture}')` }}
                  />
                )}
                <CardHeader className="text-muted border-top py-3">
                  <button
                    onClick={() => {
                      setSelectedSubject(subject);
                      setIsSubjectView(false);
                    }}
                  >
                    Unit
                  </button>
                </CardHeader>
                <CardBody>
                  <h5 className="card-title">
                    <div className="text-fiord-blue" href="#">
                      {subject.name}
                    </div>
                  </h5>
                  <p className="card-text">{subject.description}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <Row>
                    <Col>
                      <Chip
                        variant="outlined"
                        size="small"
                        avatar={<Avatar alt="Natacha" src={subject.picture} />}
                        label="BookMark"
                        onDelete={handleDelete}
                        onClick={() => {
                          action("BookMark");
                        }}
                      />

                      <Chip
                        variant="outlined"
                        size="small"
                        avatar={<Avatar alt="Natacha" src={subject.picture} />}
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
                        avatar={<Avatar alt="Natacha" src={subject.picture} />}
                        label="Examples"
                        onDelete={handleDelete}
                        onClick={() => {
                          action("EXAMPLE");
                        }}
                      />
                      <Chip
                        variant="outlined"
                        size="small"
                        avatar={<Avatar alt="Natacha" src={subject.picture} />}
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
        <Unitview selectedSubject={selectedSubject} />
      )}
    </Container>
  );
}
