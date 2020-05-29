import React, { useState } from "react";
import ReactQuill from "react-quill";
import uploadFile from "../../../../../commoncomponent/files/fileupload";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  CardFooter,
  InputGroup,
  Form,
  FormInput,
} from "shards-react";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { CREATE_QUESTION } from "../../../../../../graphql/mutations/education/question";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_UNIT_BY_ID } from "../../../../../../graphql/queries/education/unit";
import { MY_ASSIGNED_SUBJECTS } from "../../../../../../graphql/queries/users/user";

import PageTitle from "../../../../../../components/common/PageTitle";
import ContentFormOptionalDataAction from "../common/ContentFormOptionalDataAction";
import EditorTypeSelectionRadio from "../common/EditorTypeSelectionRadio";
import OptionCreateDialog from "./OptionCreateDialog";
import QuestionTypeCheckbox from "./QuestionTypeCheckbox";
import OptionCard from "./OptionCard";
import "react-quill/dist/quill.snow.css";
import "../../../../../../assets/quill.css";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Question(props) {
  const classes = useStyles();
  console.log("Question CREATION PROPERTY", props);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [quetype, setQuetype] = useState("SC");
  const [questionType, setQuestionType] = useState("HTML");
  const [questionStatus, setQuestionStatus] = useState("APPROVED");
  const [questionState, setQuestionState] = useState("ACTIVE");
  const [questionAvailable, setQuestionAvailable] = useState("FREE");
  const [editorQuestion, setEditorQuestion] = useState("");
  const [questionLevel, setQuestionLevel] = useState(1);
  const [url, setUrl] = useState("");
  const [fileData, setFileData] = useState(null);
  const [fileTypeInfo, setFileTypeInfo] = useState({});
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [isOption, setIsOption] = useState(false);
  const statusList = [
    { name: "APPROVED" },
    { name: "SUBMITTED" },
    { name: "REJECTED" },
  ];
  const questionStateList = ["ACTIVE", "DORMANT", "DEACTIVE"];
  const questionAvailableList = ["FREE", "PAID", "SPONSERED", "SUBSIDIZED"];
  const questionLevelList = [1, 2, 3, 4, 5, 6];
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const uploadFileFunc = (file) => {
    setFileTypeInfo({ type: file.type });
    uploadFile(file).then((res) => {
      setUrl(res);
    });
  };
  const [createQuestion] = useMutation(CREATE_QUESTION);
  const resetObect = () => {
    setName("");
    setEditorQuestion("");
    setUrl("");
    setFileData("");
    setFileTypeInfo("");
  };
  const resetOption = () => {
    // setOptions();
  };
  console.log("options created for qiest", options);
  const getComponent = () => {
    switch (questionType) {
      case "HTML":
        return (
          <div>
            <FormInput
              size="lg"
              className="mb-3"
              placeholder="Question Title"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <ReactQuill
              className="add-new-post__editor mb-1"
              modules={modules}
              formats={formats}
              value={editorQuestion}
              onChange={setEditorQuestion}
            />
          </div>
        );

      case "YOUTUBE":
        return (
          <div>
            <TextField
              required
              id="Title-outlined-required"
              label="Question Title"
              fullWidth
              variant="outlined"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Enter YOUTUBE URL"
              type="text"
              fullWidth
              variant="outlined"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
              }}
            />
          </div>
        );
      case "FILE":
        return (
          <div>
            <Col md="6" className="form-group">
              <FormInput
                size="lg"
                className="mb-3"
                placeholder="Question Title"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Col>
            <Col md="6" className="form-group">
              <FormInput
                size="lg"
                type="file"
                className="custom-file-input"
                id="customFile2"
                onChange={(e) => {
                  setFileData(e.target.files[0]);
                  uploadFileFunc(e.target.files[0]);
                }}
              />

              <label className="custom-file-label" htmlFor="customFile2">
                Choose file...
              </label>
              <label> {fileData ? fileData.name : ""}</label>
            </Col>
          </div>
        );
    }
  };
  return (
    <div>
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          {questionType ? getComponent() : ""}
          {isOption ? (
            <OptionCreateDialog
              maxWidth="md"
              open={true}
              setChecked={setChecked}
              checked={checked}
              setOptions={setOptions}
              options={options}
              resetOption={resetOption}
            />
          ) : (
            ""
          )}

          <Card>
            <CardHeader>
              <button
                onClick={(e) => {
                  let myobj = {};
                  console.log("BEFORE FORMING OBJECT here is property ", props);
                  switch (props.componentLevel) {
                    case "SUBJECT":
                      myobj["subject"] = props.subjectid;
                      break;
                    case "UNIT":
                      myobj["unit"] = props.unitid;
                    case "TOPIC":
                      myobj["topic"] = props.topicid;
                  }

                  myobj["url"] = url;
                  myobj["type"] = questionType;
                  myobj["isPublished"] = true;
                  myobj["state"] = questionState;
                  myobj["status"] = questionStatus;
                  myobj["level"] = questionLevel;
                  myobj["descriptionfileInfo"] = { fileInfo: fileTypeInfo };
                  myobj["available"] = questionAvailable;
                  myobj["options"] = options;
                  myobj["descriptionType"] = "DUMMY";
                  myobj["quetype"] = quetype;
                  if (questionType === "HTML") {
                    const file = new File([editorQuestion], props.fileName, {
                      type: "text/html",
                    });
                    setFileTypeInfo({ type: file.type });
                    uploadFile(file).then((res) => {
                      myobj["descriptionfileInfo"] = { fileInfo: file.type };
                      myobj["url"] = res;
                      createQuestion({
                        variables: myobj,
                        refetchQueries: [props.query],
                      })
                        .then((res) => {
                          console.log("MYOBJECTCreated Question", res);
                          resetObect();
                        })
                        .catch((err) => {
                          throw new Error("Error in creating Question", err);
                        });
                    });
                  } else {
                    createQuestion({
                      variables: myobj,
                      refetchQueries: [props.query],
                    })
                      .then((res) => {
                        console.log("MYOBJECTCreated Question", res);
                      })
                      .catch((err) => {
                        throw new Error("Error in creating Question");
                      });
                  }

                  console.log("\n\nQuestion Data After IF::>", myobj);
                }}
              >
                Create Question
              </button>
            </CardHeader>
          </Card>
        </Col>

        {/* Sidebar Widgets */}
        {/**Question Option */}

        <Col lg="3" md="12">
          <QuestionTypeCheckbox quetype={quetype} setQuetype={setQuetype} />
          <EditorTypeSelectionRadio
            contentType={questionType}
            setContentType={setQuestionType}
            title="EditorType"
          />
          <Button
            onClick={() => {
              setIsOption(true);
            }}
          >
            Options
          </Button>
          <ContentFormOptionalDataAction
            setStatus={setQuestionStatus}
            statusList={statusList}
            setState={setQuestionState}
            stateList={questionStateList}
            setAvailable={setQuestionAvailable}
            availableList={questionAvailableList}
            setLevel={setQuestionLevel}
            levelList={questionLevelList}
          />
        </Col>
      </Row>
      <OptionCard />
    </div>
  );
}
