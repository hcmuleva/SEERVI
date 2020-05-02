import React, { useState } from "react";
import { Row, Col, InputGroup, Form, FormInput } from "shards-react";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { CREATE_CONTENT } from "../../../../../graphql/mutations/education/content";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_UNIT_BY_ID } from "../../../../../graphql/queries/education/unit";
import { MY_ASSIGNED_SUBJECTS } from "../../../../../graphql/queries/users/user";

import PageTitle from "../../../../../components/common/PageTitle";
import ContentFormOptionalDataAction from "./ContentFormOptionalDataAction";
import EditorTypeSelectionRadio from "./EditorTypeSelectionRadio";
import HTMLEditor from "./HTMLEditor";
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

  // const [value, setValue] = useState(0);
  // const [level, setLevel] = useState("");
  // const [type, setType] = useState("");
  // const [url, setUrl] = useState("");
  // const [fileTypeInfo, setFileTypeInfo] = useState({ fileInfo: "" });
  // const [fileData, setFileData] = React.useState({
  //   fileInfo: { fileInfo: "" },
  //   type: "",
  //   url: "",
  // });
  // const formObjectInit = {
  //   name: "",
  //   number: "",
  //   isPublished: true,
  //   state: "ACTIVE",
  //   status: "APPROOVED",
  //   available: "FREE",
  // };
  // if (props && props.subject) {
  //   setFormObject({ ...formObject, ["subject"]: props.subjectid });
  // }
  // if (props && props.unit) {
  //   setFormObject({ ...formObject, ["unit"]: props.unit });
  // }
  // const [formObject, setFormObject] = useState(formObjectInit);
  // const handleChange = (formkey) => ({ target: { value } }) => {
  //   setFormObject({ ...formObject, [formkey]: value });
  // };

  //const [createContent] = useMutation(CREATE_CONTENT);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [contentType, setContentType] = useState("HTML");
  const [constantStatus, setConstentStatus] = useState("APPROVED");
  const [contantState, setContentState] = useState("ACTIVE");
  const [contentAvailable, setContentAvailable] = useState("FREE");
  const [contentLevel, setContentLevel] = useState(1);
  const statusList = [
    { name: "APPROVED" },
    { name: "SUBMITTED" },
    { name: "REJECTED" },
  ];
  const contentStateList = ["ACTIVE", "DORMANT", "DEACTIVE"];
  const contentAvailableList = ["FREE", "PAID", "SPONSERED", "SUBSIDIZED"];
  const contentLevelList = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Add New Post"
          subtitle="Blog Posts"
          className="text-sm-left"
        />
      </Row>

      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <h1>
            {contentType} Status: {constantStatus} state:{contantState}
          </h1>
          {contentType === "HTML" ? <HTMLEditor /> : ""}
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          <EditorTypeSelectionRadio
            title="HCM"
            contentType={contentType}
            setContentType={setContentType}
          />
          <ContentFormOptionalDataAction
            setStatus={setConstentStatus}
            statusList={statusList}
            setContentState={setContentState}
            contentStateList={contentStateList}
            setContentAvailable={setContentAvailable}
            contentAvailableList={contentAvailableList}
            setContentLevel={setContentLevel}
            contentLevelList={contentLevelList}
          />
        </Col>
      </Row>
      <button
        onClick={(e) => {
          console.log("Content Data");
        }}
      >
        Create Content
      </button>
    </div>
  );
}
