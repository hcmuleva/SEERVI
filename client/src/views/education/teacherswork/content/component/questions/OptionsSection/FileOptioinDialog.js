import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Col, FormInput } from "shards-react";

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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import uploadFile from "../../../../../../commoncomponent/files/fileupload";

export default function FileOptioinDialog(props) {
  const [open, setOpen] = React.useState(props.open);
  const [fileData, setFileData] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const newElm = {
    optionurl: "",
    optionDataType: "FILE",
    optionfileInfo: "",
    optionData: "",
    isCorrectOption: checked,
  };
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
    resetSwitch();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = (event) => {
    uploadFile(fileData).then((res) => {
      const newElm = {
        optionurl: res,
        optionDataType: "HTML",
        optionfileInfo: fileData.type,
        optionData: "",
        isCorrectOption: checked,
      };
      props.setOptions([...props.options, newElm]);
    });
    if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
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
      <Tooltip title="Create Option">
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
          <DialogContentText>"Upload file for Option "</DialogContentText>
          <Col md="6" className="form-group">
            <FormInput
              type="file"
              className="custom-file-input"
              id="customFile2"
              onChange={(e) => {
                setFileData(e.target.files[0]);
              }}
            />

            <label className="custom-file-label" htmlFor="customFile2">
              Choose file...
            </label>
            <label> {fileData.name}</label>
          </Col>

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                value="secondary"
                color="primary"
                onChange={handleChange}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Is This Correct Option?"
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
}
