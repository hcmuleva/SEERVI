import React, { useState } from "react";
import { Row, Col, InputGroup, Form, FormInput } from "shards-react";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { CREATE_CONTENT } from "../../../../graphql/mutations/education/content";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_UNIT_BY_ID } from "../../../../graphql/queries/education/unit";
import { MY_ASSIGNED_SUBJECTS } from "../../../../graphql/queries/users/user";
import EditorView from "./editorChoiceMenu";
import ContentForm from "./form";
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
  const [value, setValue] = useState(0);
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [fileTypeInfo, setFileTypeInfo] = useState({ fileInfo: "" });
  const [fileData, setFileData] = React.useState({
    fileInfo: { fileInfo: "" },
    type: "",
    url: "",
  });
  const formObjectInit = {
    name: "",
    level: "",
    isPublished: true,
    state: "ACTIVE",
    status: "APPROOVED",
    available: "FREE",
  };
  if (props && props.subject) {
    setFormObject({ ...formObject, ["subject"]: props.subjectid });
  }
  if (props && props.unit) {
    setFormObject({ ...formObject, ["unit"]: props.unit });
  }
  const [formObject, setFormObject] = useState(formObjectInit);
  const handleChange = (formkey) => ({ target: { value } }) => {
    setFormObject({ ...formObject, [formkey]: value });
  };
  console.log(
    "formObject",
    formObject,

    "url",
    url,
    "type",
    type
  );
  const [createContent] = useMutation(CREATE_CONTENT);

  const [selectedSubject, setSelectedSubject] = useState("");
  return (
    <div>
      {/** <InputLabel id="subject-select-label">Subject</InputLabel>

      <Select
        labelId="subject-select-label"
        id="subject-select-label"
        value={selectedSubject}
        onChange={(e) => {
          console.log("SELECTED SUBJECT", e.target.name, "  and E ", e.target);
          const name = e.target.value;
          console.log("NAME ", name);
          setSelectedSubject(name);
        }}
      >
        {subjectlist.map((sub, index) => {
          console.log("sub ", sub, "and name ", sub.name);
          return <MenuItem value={sub.id}>{sub.name}</MenuItem>;
        })}
      </Select> */}
      <ContentForm setFormObject={setFormObject} formObject={formObject} />
      <EditorView fileData={fileData} setFileData={setFileData} />
      <button
        onClick={(e) => {
          console.log("PROPS recived ");
          let myobj = { ...formObject, ...fileData };
          if (props.subjectid) {
            myobj["subject"] = props.subjectid;
          }
          if (props.unitid) {
            myobj["unit"] = props.unitid;
          }
          if (props.topicid) {
            myobj["topic"] = props.topicid;
          }
          if (!myobj.level) {
            myobj["level"] = 1;
          }
          console.log("Before Create object ", myobj);
          createContent({
            variables: myobj,
            refetchQueries: [{ query: MY_ASSIGNED_SUBJECTS }],
          })
            .then((res) => {
              console.log("Created Content", res);
            })
            .catch((err) => {
              throw new Error("Error in creating Content");
            });
        }}
      >
        CreateContent
      </button>
    </div>
  );
}
