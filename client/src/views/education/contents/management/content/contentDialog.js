import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

import GroupWorkIcon from "@material-ui/icons/GroupWork";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { CREATE_CONTENT } from "../../../../../graphql/mutations/education/content";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_UNIT_BY_ID } from "../../../../../graphql/queries/education/unit";
import ContentCreation from "../../../../commoncomponent/commonButtons";
import {
  Container,
  Row,
  FormInput,
  FormFeedback,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Buttons,
  ListGroup,
  ListGroupItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";
const formObjectInit = {
  name: "",
  subject: "",
  unit: "",
  isPublished: true,
  state: "ACTIVE",
  status: "APPROOVED",
  available: "FREE",
  description: "",
  picture: "",
};

const ContentDialog = (props) => {
  const [formobj1, setFormobj1] = useState();

  console.log("PROPS IN CONTENT DIALOG ", props);
  console.log("CREATE CONTENT DATA DIaLOG from ContentDialog", props.subjectid);
  formObjectInit["subject"] = props.subjectid;
  formObjectInit["unit"] = props.unitid;
  const [formObject, setFormObject] = useState(formObjectInit);
  const { createDataHandler } = props;
  const [open, setOpen] = useState(false);
  const [createContent] = useMutation(CREATE_CONTENT);

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

  const handleAdd = (event) => {
    console.log("FORM DATA ", formObject);
    createContent({
      variables: {
        name: formObject.name,
        subject: formObject.subject,
        unit: formObject.unit,
      },
      refetchQueries: [
        { query: GET_UNIT_BY_ID, variables: { id: props.unitid } },
      ],
    })
      .then((res) => {
        console.log("Created Content", res);
      })
      .catch((err) => {
        throw new Error("Error in creating Content");
      });
    if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    setFormObject(formObjectInit);
    console.log("Content added ", formObject);
  };

  const handleChange = (formkey) => ({ target: { value } }) => {
    setFormObject({ ...formObject, [formkey]: value });
  };
  const handleChange1 = (formkey) => ({ target: { value } }) => {
    setFormobj1({ ...formobj1, [formkey]: value });
  };
  console.log("Form Value", formobj1);
  function iconStyles(type) {
    return {
      formObjectIcon: {
        color: "blue",
      },
    };
  }
  const classes = makeStyles(iconStyles)(props.type);
  return (
    <div>
      <Tooltip title="Content">
        <IconButton size="small" aria-label="CONTENT" onClick={handleClickOpen}>
          <LocalLibraryOutlinedIcon className={classes.formObjectIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth="lg"
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="topicformObjectform-dialog-title"
        modal={true}
        autoDetectWindowHeight={false}
        autoScrollBodyContent={false}
      >
        <DialogContent className={classes.dialogPaper}>
          <Row>
            <Col sm="12" md="12">
              <ContentCreation />
            </Col>
          </Row>
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
};

export default ContentDialog;
