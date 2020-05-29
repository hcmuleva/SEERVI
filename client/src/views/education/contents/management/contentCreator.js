import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import YouTubeIcon from "@material-ui/icons/YouTube";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachmentIcon from "@material-ui/icons/Attachment";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Row, Col, InputGroup, Form, FormInput } from "shards-react";
import ReactQuill from "react-quill";
import Box from "@material-ui/core/Box";
import YoutubeContent from "./content/YoutubeContent";
import Editor from "./content/editor";
import uploadFile from "../../../commoncomponent/files/fileupload";
import { CREATE_CONTENT } from "../../../../graphql/mutations/education/content";

import { useQuery, useMutation } from "@apollo/react-hooks";
import Fileattachment from "./content/fileattachment";
import "react-quill/dist/quill.snow.css";
import "../../../../assets/quill.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ContentCreator(props) {
  const [value, setValue] = useState(0);
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [fileTypeInfo, setFileTypeInfo] = useState({ fileInfo: "" });
  const formObjectInit = {
    name: "",
    fileInfo: fileTypeInfo,
    type: type,
    url: "",
    isPublished: true,
    state: "ACTIVE",
    status: "APPROOVED",
    available: "FREE",
    description: "",
    picture: "",
  };

  const [formObject, setFormObject] = useState(formObjectInit);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (formkey) => ({ target: { value } }) => {
    setFormObject({ ...formObject, [formkey]: value });
  };

  let myEditorData = "";
  const myData = [
    {
      tabicon: <AttachmentIcon />,
    },
    {
      tabicon: <SpellcheckIcon />,
      comp: (
        <Editor
          handleChange={handleChange}
          setFileURL={setUrl}
          fileName="Content.html"
          setFileInfo={setFileTypeInfo}
          setType={setType}
        />
      ),
    },

    {
      tabicon: <YouTubeIcon />,
    },
  ];

  //formObjectInit["subject"] = props.selectedSubject.id;
  const { createDataHandler } = props;
  const [open, setOpen] = React.useState(false);
  // const [createUnit] = useMutation(CREATE_UNIT);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = (stdname) => (event) => {
    setSwitchState({ ...switchState, [stdname]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };

  const [createContent] = useMutation(CREATE_CONTENT);
  let myobj = {
    name: formObject.name,
    fileInfo: { fiileinfo: fileTypeInfo },
    type: type,

    subject: props.subjectid,
    url: url,
    level: formObject.level,
    isPublished: true,
    state: "ACTIVE",
    status: "APPROOVED",
    available: "FREE",
    description: formObject.description,
    picture: "",
  };
  console.log("PROPERTY in CREATROR", props);
  const handleAdd = (event) => {
    if ("UNIT" === props.atLevel) {
      myobj["unit"] = props.unitid;
    }
    if ("TOPIC" === props.atLevel) {
      myobj["topic"] = props.topicid;
    }

    console.log("formObject insiide CREATE Mutation", myobj);
    createContent({
      variables: myobj,
      refetchQueries: [
        {
          query: props.query,
          variables: { id: props.refetchid },
        },
      ],
    })
      .then((res) => {
        console.log("Created content at Unit level", res);
      })
      .catch((err) => {
        throw new Error("Error in creating content ");
      });
    if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    setFormObject(formObjectInit);
  };

  function iconStyles(type) {
    return {
      formObjectIcon: {
        color: "blue",
      },
    };
  }
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
      ["link", "image"],
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

  const classes = makeStyles(iconStyles)(props.type);
  const {
    loading: topicLoading,
    error: topicError,
    data: topicData,
  } = useQuery(props.query, { variables: { id: props.unitid } });
  if (topicError) return <p>Topic ERROR: {topicError.message}</p>;
  if (topicData === undefined) return <p>ERROR in GETTing topic</p>;
  if (topicLoading) {
    return <div>TopicData Loading</div>;
  }
  return (
    <div className={classes.root}>
      <Tooltip title="Content">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleClickOpen}
        >
          <DescriptionIcon />
          CreateContent
        </Button>
      </Tooltip>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="subformObjectform-dialog-title"
      >
        <DialogTitle id="subformObjectform-dialog-title">
          Create Content
        </DialogTitle>
        <DialogContent>
          <Row>
            <Col md="6" className="form-group">
              <FormInput placeholder="name" onChange={handleChange("name")} />
            </Col>
            <Col md="3" className="form-group">
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={2}
                placeholder="Description"
                onChange={handleChange("description")}
              />
            </Col>
            <Col md="3" className="form-group">
              <InputLabel id="demo-simple-select-label">Level</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={level}
                onChange={(e) => {
                  console.log("Selected LEvel ", e.target.value);
                  setLevel(e.target.value);
                  setFormObject({ ...formObject, ["level"]: e.target.value });
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </Col>
          </Row>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable prevent tabs example"
          >
            {myData.map((elm, index) => {
              return (
                <Tab
                  key={index}
                  icon={elm.tabicon}
                  aria-label="phone"
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
          <TabPanel key={0} value={value} index={0}>
            <Col md="6" className="form-group" key={0}>
              <FormInput
                type="file"
                className="custom-file-input"
                id="customFile2"
                onChange={(e) => {
                  console.log(
                    "File uploaded mime type=>",
                    e.target.files[0].type
                  );
                  const fileType = { fileInfo: e.target.files[0].type };
                  setFileTypeInfo(e.target.files[0].type);
                  setType("FILE");
                  uploadFile(e.target.files[0]).then((res) => {
                    // setFormObject({
                    //   ...formObject,
                    //   ["url"]: res,
                    //   ["fileInfo"]: fileType,
                    //   ["type"]: "HTML",
                    // });
                    setUrl(res);
                  });
                }}
              />

              <label className="custom-file-label" htmlFor="customFile2">
                Choose file...
              </label>
            </Col>
          </TabPanel>
          <TabPanel key={1} value={value} index={1}>
            <Row>
              <Col md="6" className="form-group">
                <Form className="add-new-post">
                  {/** <FormInput size="lg" className="mb-3" placeholder="Your content Title" name="contentTitle" id="contentTitleId"/> */}
                  <ReactQuill
                    className="add-new-post__editor mb-1"
                    modules={modules}
                    formats={formats}
                    onChange={(content, delta, source, editor) => {
                      myEditorData = content;
                    }}
                  />
                  <input
                    type="submit"
                    value="save"
                    onClick={(e) => {
                      e.preventDefault();
                      setFileTypeInfo({ type: "text/html" });
                      setType("HTML");
                      const file = new File([myEditorData], props.fileName, {
                        type: "text/html",
                      });
                      uploadFile(file).then((res) => {
                        setUrl(res);
                      });
                    }}
                  />
                </Form>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel key={2} value={value} index={2}>
            <Row>
              <Col md="6" className="form-group">
                <FormInput
                  placeholder="YouTube URL"
                  onChange={(event) => {
                    setUrl(event.target.value);
                    setType("YOUTUBE");
                    handleChange("url");
                  }}
                />
              </Col>
            </Row>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange("addMultiple")}
              value="addMultiple"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
