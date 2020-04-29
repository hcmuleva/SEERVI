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
import { CREATE_TOPIC } from "../../../../../graphql/mutations/education/topic";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_UNIT_BY_ID } from "../../../../../graphql/queries/education/unit";

const formObjectInit = {
  name: "",
  unit: "",
  isPublished: true,
  state: "ACTIVE",
  status: "APPROOVED",
  available: "FREE",
  description: "",
  picture: "",
};

const TopicDialog = (props) => {
  console.log("PROPS IN TOPIC DIALOG ", props.unitid);
  formObjectInit["unit"] = props.unitid;
  const [formObject, setFormObject] = useState(formObjectInit);
  const { createDataHandler } = props;
  const [open, setOpen] = useState(false);
  const [createTopic] = useMutation(CREATE_TOPIC);

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
    createTopic({
      variables: formObject,
      refetchQueries: [
        { query: GET_UNIT_BY_ID, variables: { id: props.unitid } },
      ],
    })
      .then((res) => {
        console.log("Created Topic", res);
      })
      .catch((err) => {
        throw new Error("Error in creating Topic");
      });
    if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    setFormObject(formObjectInit);
    console.log("Topic added ", formObject);
  };

  const handleChange = (formkey) => ({ target: { value } }) => {
    setFormObject({ ...formObject, [formkey]: value });
  };
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
      <Tooltip title="TOPIC">
        <IconButton size="small" aria-label="TOPIC" onClick={handleClickOpen}>
          <LocalLibraryOutlinedIcon className={classes.formObjectIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="topicformObjectform-dialog-title"
      >
        <DialogTitle id="topicformObjectform-dialog-title">
          Create Topic
        </DialogTitle>
        <DialogContent>
          <DialogContentText>"TOPIC"</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Topic Name"
            type="text"
            fullWidth
            value={formObject.name}
            onChange={handleChange("name")}
          />
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

export default TopicDialog;
