import React, { useState } from "react";
import ReactQuill from "react-quill";
import uploadFile from "../../../../../commoncomponent/files/fileupload";

import {
  Row,
  Col,
  Card,
  CardHeader,
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
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { CREATE_CONTENT } from "../../../../../../graphql/mutations/education/content";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_UNIT_BY_ID } from "../../../../../../graphql/queries/education/unit";
import { MY_ASSIGNED_SUBJECTS } from "../../../../../../graphql/queries/users/user";

import PageTitle from "../../../../../../components/common/PageTitle";
import ContentFormOptionalDataAction from "../common/ContentFormOptionalDataAction";
import EditorTypeSelectionRadio from "../common/EditorTypeSelectionRadio";

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

export default function ContentCreator(props) {
  const classes = useStyles();
  console.log("CONTENT CREATION PROPERTY", props);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [contentType, setContentType] = useState("HTML");
  const [constentStatus, setConstentStatus] = useState("APPROVED");
  const [contentState, setContentState] = useState("ACTIVE");
  const [contentAvailable, setContentAvailable] = useState("FREE");
  const [editorContent, setEditorContent] = useState("");
  const [contentLevel, setContentLevel] = useState(1);
  const [url, setUrl] = useState("");
  const [fileData, setFileData] = useState(null);
  const [fileTypeInfo, setFileTypeInfo] = useState({});
  const [name, setName] = useState("");
  const statusList = [
    { name: "APPROVED" },
    { name: "SUBMITTED" },
    { name: "REJECTED" },
  ];
  const contentStateList = ["ACTIVE", "DORMANT", "DEACTIVE"];
  const contentAvailableList = ["FREE", "PAID", "SPONSERED", "SUBSIDIZED"];
  const contentLevelList = [1, 2, 3, 4, 5, 6];
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
  const [createContent] = useMutation(CREATE_CONTENT);
  const resetObect = () => {
    setName("");
    setEditorContent("");
    setUrl("");
    setFileData("");
    setFileTypeInfo("");
  };
  const getComponent = () => {
    switch (contentType) {
      case "HTML":
        return (
          <div>
            <FormInput
              size="lg"
              className="mb-3"
              placeholder="Content Title"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <ReactQuill
              className="add-new-post__editor mb-1"
              modules={modules}
              formats={formats}
              value={editorContent}
              onChange={setEditorContent}
            />
          </div>
        );

      case "YOUTUBE":
        return (
          <div>
            <TextField
              required
              id="Title-outlined-required"
              label="Content Title"
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
                placeholder="Content Title"
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
          {contentType ? getComponent() : ""}
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
                  myobj["name"] = name;
                  myobj["url"] = url;
                  myobj["type"] = contentType;
                  myobj["isPublished"] = true;
                  myobj["state"] = contentState;
                  myobj["status"] = constentStatus;
                  myobj["level"] = contentLevel;
                  myobj["fileInfo"] = { fileInfo: fileTypeInfo };
                  myobj["available"] = contentAvailable;
                  if (contentType === "HTML") {
                    const file = new File([editorContent], props.fileName, {
                      type: "text/html",
                    });
                    setFileTypeInfo({ type: file.type });
                    uploadFile(file).then((res) => {
                      myobj["fileInfo"] = { fileInfo: file.type };
                      myobj["url"] = res;
                      createContent({
                        variables: myobj,
                        refetchQueries: [props.query],
                      })
                        .then((res) => {
                          console.log("MYOBJECTCreated Content", res);
                          resetObect();
                        })
                        .catch((err) => {
                          throw new Error("Error in creating Content");
                        });
                    });
                  } else {
                    createContent({
                      variables: myobj,
                      refetchQueries: [props.query],
                    })
                      .then((res) => {
                        console.log("MYOBJECTCreated Content", res);
                      })
                      .catch((err) => {
                        throw new Error("Error in creating Content");
                      });
                  }

                  console.log("\n\nContent Data After IF::>", myobj);
                }}
              >
                Create Content
              </button>
            </CardHeader>
          </Card>
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          <EditorTypeSelectionRadio
            contentType={contentType}
            setContentType={setContentType}
          />
          <ContentFormOptionalDataAction
            setStatus={setConstentStatus}
            statusList={statusList}
            setState={setContentState}
            stateList={contentStateList}
            setAvailable={setContentAvailable}
            availableList={contentAvailableList}
            setLevel={setContentLevel}
            levelList={contentLevelList}
          />
        </Col>
      </Row>
    </div>
  );
}
