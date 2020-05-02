import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

import GroupWorkIcon from "@material-ui/icons/GroupWork";
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
export default function TextQuestionDescDialog(props) {
  const [open, setOpen] = React.useState(props.open);
  const [textDataType, setTextDataType] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.setDescriptionData("Returned from Chiled" + props.title);
    setOpen(false);
  };
  const handleAdd = (event) => {
    props.setDescriptionData(textDataType);
    props.setDescriptionType("TEXT");
    setOpen(false);
  };
  const handleChange = (formkey) => ({ target: { value } }) => {
    // setFormObject({ ...formObject, [formkey]: value });
  };
  function iconStyles(type) {
    return {
      formObjectIcon: {
        color: "blue",
      },
    };
  }
  const classes = makeStyles(iconStyles);
  return (
    <div>
      <Tooltip title="DESCRIPTION">
        <IconButton
          size="small"
          aria-label="Question Enter"
          onClick={handleClickOpen}
        >
          <AddIcon className={classes.formObjectIcon} />
          <GroupWorkIcon className={classes.formObjectIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={props.maxWidth}
        aria-labelledby="subformObjectform-dialog-title"
      >
        <DialogContent>
          <DialogContentText>{props.title}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Question"
            type="text"
            fullWidth
            value={textDataType}
            onChange={(event) => {
              setTextDataType(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
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
