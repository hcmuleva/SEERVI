import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormInput,
} from "shards-react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import YouTubeIcon from "@material-ui/icons/YouTube";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Editor from "../education/contents/management/content/editor";

export default function ContentCreation() {
  console.log("Content creation");

  const [fileURL, setFileURL] = useState("");
  const [formObject, setFormObject] = useState({});
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [fileInfo, setFileInfo] = useState("");
  const [dataType, setDataType] = useState("YOUTUBE");

  const handleChange = (formkey) => ({ target: { value } }) => {
    setFormObject({ ...formObject, [formkey]: value });
  };

  const pStyle = {
    fontSize: "20px",
    textAlign: "center",
  };
  return (
    <Card>
      {/* Content Creation */}
      <h6 className="m-0" style={pStyle}>
        ContentCreation
      </h6>
      <CardHeader className="border-bottom">
        <ListGroup flush>
          <ListGroupItem className="px-3">
            <strong className="text-muted d-block mb-2">
              <Col sm="9" md="9">
                <FormInput
                  placeholder="name"
                  required
                  onChange={handleChange("name")}
                />
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level}
                  onChange={(e) => {
                    console.log("Selected LEvel ", e.target.value);
                    setLevel(e.target.value);
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </Col>
            </strong>
          </ListGroupItem>
        </ListGroup>

        <ListGroup flush>
          <ListGroupItem className="px-3">
            <strong className="text-muted d-block mb-2">
              <Row>
                <Col>
                  <Button
                    theme="primary"
                    outline
                    className="sb-1 mr-1"
                    onClick={() => {
                      setDataType("YOUTUBE");
                    }}
                  >
                    <YouTubeIcon style={{ fontSize: 20, color: "red" }} />
                  </Button>
                  <Button
                    theme="secondary"
                    outline
                    className="sb-1 mr-1"
                    onClick={() => {
                      setDataType("HTML");
                    }}
                  >
                    <SpellcheckIcon style={{ fontSize: 20, color: "blue" }} />
                  </Button>
                  <Button
                    theme="success"
                    outline
                    className="sb-1 mr-1"
                    onClick={() => {
                      console.log("File DataType", dataType);
                      setDataType("FILE");
                    }}
                  >
                    <AttachmentIcon style={{ fontSize: 20, color: "blue" }} />
                  </Button>
                </Col>
              </Row>
            </strong>
          </ListGroupItem>
        </ListGroup>
      </CardHeader>
      <CardBody>
        <strong className="text-muted d-block mb-2">
          <div className="custom-file mb-3">
            {"FILE" === dataType ? (
              <div>
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile2"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    console.log(
                      "File uploaded mime type=>",
                      e.target.files[0].type
                    );
                    setFileInfo({ file: e.target.files[0].type });
                  }}
                />

                <label className="custom-file-label" htmlFor="customFile2">
                  Choose file...
                </label>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {"YOUTUBE" === dataType ? (
              <FormInput
                placeholder="YouTube URL"
                required
                onChange={handleChange("url")}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            {"HTML" === dataType ? (
              <Editor fileName="HTMLContent.txt" setFileURL={setFileURL} />
            ) : (
              ""
            )}
          </div>
        </strong>
      </CardBody>
    </Card>
  );
}
