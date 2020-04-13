import React from "react";
import { Container, Row, Col, Card } from "shards-react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Suborg from "./suborg/suborg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(1.5),
    },
    "& hr": {
      margin: theme.spacing(0, 0.5),
    },
  },
}));
export default function Suborgmgmt() {
  const classes = useStyles();

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Suborg />
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Grid container alignItems="center" className={classes.root}>
            <Divider orientation="vertical" flexItem />
            <h3>H1</h3>
          </Grid>
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          <Grid container alignItems="center" className={classes.root}>
            <h3>H1</h3>
            <Divider orientation="vertical" flexItem />
            <h3>H1</h3>
          </Grid>
        </Col>
      </Row>
    </Container>
  );
}
