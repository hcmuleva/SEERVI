import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";

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
import uploadFile from "../../../../../../commoncomponent/files/fileupload";
import "react-quill/dist/quill.snow.css";
import "../../../../../../../assets/quill.css";
export default function HTMLQueDescEditorDialog(props) {
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
  let myData = "";
  const [open, setOpen] = React.useState(props.open);
  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = (stdname) => (event) => {
    setSwitchState({
      ...switchState,
      [stdname]: event.target.checked,
    });
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
    props.setDescriptionType("HTML");
    props.setDescriptionfileInfo({ type: "text/html" });
    const file = new File([myData], props.fileName, {
      type: "text/html",
    });
    uploadFile(file).then((res) => {
      props.setDescriptionurl(res);
    });
    if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
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
      <Tooltip title="CREATE HTML DATA">
        <IconButton size="small" aria-label="Org" onClick={handleClickOpen}>
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
          <ReactQuill
            className="add-new-post__editor mb-1"
            modules={modules}
            formats={formats}
            onChange={(content, delta, source, editor) => {
              myData = content;
            }}
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
