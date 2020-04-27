import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LineStyleIcon from "@material-ui/icons/LineStyle";
import { Container, Row, Col } from "shards-react";
import { Card, CardBody, Form, FormInput } from "shards-react";
import Editor from "./editor";
import EditorPreview from "./editorPreview";
import Youtube from "./Youtube";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export default function Contentcreate() {
  const [editorType, setEditorType] = useState("QUIL");
  const [prevData, setPrevData] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [fileURL, setFileURL] = useState(null);

  var myData = "hcm";
  const classes = useStyles();
  const renderSwitch = () => {
    switch (editorType) {
      case "QUIL":
        return <Editor fileName="HTMLContent.txt" setFileURL={setFileURL} />;
      case "YOUTUBE":
        return <Youtube setFileURL={setFileURL} />;
      case "":
    }
  };
  return (
    <div>
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={6}>
            <Grid container justify="left" spacing="1">
              <Grid key="YouTubeIcon" item>
                <YouTubeIcon
                  onClick={() => {
                    setEditorType("YOUTUBE");
                  }}
                />
              </Grid>
              <Grid key="LineStyleIcon" item>
                <LineStyleIcon
                  onClick={() => {
                    setEditorType("QUIL");
                  }}
                />
              </Grid>
             
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>{renderSwitch()}</div>
    </div>
  );
}
