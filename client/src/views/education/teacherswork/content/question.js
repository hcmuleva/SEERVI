import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert,
} from "shards-react";
import Checkboxes from "../../../../components/components-overview/Checkboxes";
import QueTypeRadio from "./component/questions/QueTypeRadio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import QueDescTypeRadio from "./component/questions/DescriptionSection/QueDescTypeRadio";
import TextQuestionDescDialog from "./component/questions/DescriptionSection/TextQuestionDescDialog";
import HTMLQueDescEditorDialog from "./component/questions/DescriptionSection/HTMLQueDescEditorDialog";
import YouTubeQuestionDescDialog from "./component/questions/DescriptionSection/YouTubeQuestionDescDialog";
import FileQuestionDescDialog from "./component/questions/DescriptionSection/FileQuestionDescDialog";

import OptionDataTypeRadio from "./component/questions/OptionsSection/OptionDataTypeRadio";
import TextOptionDialog from "./component/questions/OptionsSection/TextOptionDialog";
import HTMLOptionEditorDialog from "./component/questions/OptionsSection/HTMLOptionEditorDialog";
import YouTubeOptionDialog from "./component/questions/OptionsSection/YouTubeOptionDialog";
import FileOptioinDialog from "./component/questions/OptionsSection/FileOptioinDialog";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green, blue } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { styled } from "@material-ui/core/styles";
import { compose, spacing, palette } from "@material-ui/system";
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
const Box = styled("div")(compose(spacing, palette));
export default function Question(props) {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [isEditor, setIsEditor] = useState(false);
  const [queDescelectedValue, setQueDescelectedValue] = useState(null);
  const [descriptionData, setDescriptionData] = useState(null);
  const [queTypeValue, setQueTypeValue] = useState(null);
  const [optionTypeValue, setOptionTypeValue] = useState(null);

  const [descriptionurl, setDescriptionurl] = useState(null);
  const [descriptionType, setDescriptionType] = useState(null);
  const [descriptionfileInfo, setDescriptionfileInfo] = useState(null);

  const [options, setOptions] = useState([]);

  const getQueDescriptionComp = (type) => {
    switch (type) {
      case "TEXT":
        return (
          <TextQuestionDescDialog
            title="TEXT"
            open={true}
            maxWidth="sm"
            setDescriptionData={setDescriptionData}
            setDescriptionType={setDescriptionType}
            setDescriptionfileInfo={setDescriptionfileInfo}
          />
        );
        break;
      case "HTML":
        return (
          <HTMLQueDescEditorDialog
            maxWidth="md"
            open={true}
            setDescriptionData={setDescriptionData}
            setDescriptionurl={setDescriptionurl}
            setDescriptionType={setDescriptionType}
            setDescriptionfileInfo={setDescriptionfileInfo}
          />
        );
        break;
      case "YOUTUBE":
        return (
          <YouTubeQuestionDescDialog
            maxWidth="sm"
            open={true}
            setDescriptionType={setDescriptionType}
            setDescriptionurl={setDescriptionurl}
            setDescriptionData={setDescriptionData}
          />
        );
        break;
      case "FILE":
        return (
          <FileQuestionDescDialog
            open={true}
            maxWidth="sm"
            setDescriptionData={setDescriptionData}
            setDescriptionurl={setDescriptionurl}
            setDescriptionType={setDescriptionType}
            setDescriptionfileInfo={setDescriptionfileInfo}
          />
        );
      default:
        return "";
        break;
    }
  };

  const getOptionComp = (type) => {
    switch (type) {
      case "TEXT":
        return (
          <TextOptionDialog
            open={true}
            maxWidth="sm"
            setOptions={setOptions}
            options={options}
          />
        );
        break;
      case "HTML":
        return (
          <HTMLOptionEditorDialog
            maxWidth="md"
            open={true}
            setOptions={setOptions}
            options={options}
          />
        );
        break;
      case "YOUTUBE":
        return (
          <YouTubeOptionDialog
            maxWidth="sm"
            title="YOUTUBE"
            open={true}
            setOptions={setOptions}
            options={options}
          />
        );
        break;
      case "FILE":
        return (
          <FileOptioinDialog
            title="FILE"
            open={true}
            maxWidth="sm"
            setOptions={setOptions}
            options={options}
          />
        );
      default:
        return "";
        break;
    }
  };
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <Row>
          <Col lg="5" className="mb-4">
            <Card>
              <CardBody>
                <FormControlLabel
                  labelPlacement="top"
                  control={
                    <Box color="white" bgcolor="lightblue" p={1}>
                      <QueTypeRadio
                        setQueTypeValue={setQueTypeValue}
                        queTypeValue={queTypeValue}
                      />
                    </Box>
                  }
                  label="What is your question Type?Please Select from below options"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" className="mb-4">
            <Card>
              <CardBody>
                <FormControlLabel
                  labelPlacement="top"
                  control={
                    <Box color="white" bgcolor="lightgray" p={1}>
                      <QueDescTypeRadio
                        setQueDescelectedValue={setQueDescelectedValue}
                        queDescelectedValue={queDescelectedValue}
                      />
                    </Box>
                  }
                  label="What is your mode of question creation?Please select from below options"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="5" className="mb-4">
            <Card>
              <CardBody>
                <FormControlLabel
                  labelPlacement="top"
                  control={
                    <Box color="white" bgcolor="lightblue" p={1}>
                      <OptionDataTypeRadio
                        optionTypeValue={optionTypeValue}
                        setOptionTypeValue={setOptionTypeValue}
                      />
                    </Box>
                  }
                  label="What is your mode for option creation?Please Select from below options"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="8" className="mb-4">
            <Card small>{getQueDescriptionComp(queDescelectedValue)}</Card>
          </Col>
        </Row>

        <Row>
          <Col lg="8" className="mb-4">
            <Card small>{getOptionComp(optionTypeValue)}</Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
