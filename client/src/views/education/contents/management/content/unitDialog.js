import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

import GroupWorkIcon from "@material-ui/icons/GroupWork";
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
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
import { CREATE_UNIT } from "../../../../../graphql/mutations/education/unit";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_SUBJECT_BY_ID } from "../../../../../graphql/queries/education/subject";

const formObjectInit = {
  name: "",
  subject: "",
  isPublished:true,
  state:"ACTIVE",
  status:"APPROOVED",
  available:"FREE",
  description:"",
  picture:""

};

const UnitDialog = (props) => {
  console.log("CREATE USER DATA DIaLOG from addUserDialog", props.selectedSubject.id);
  formObjectInit["subject"] = props.selectedSubject.id;
  const [formObject, setFormObject] = useState(formObjectInit);
  const { createDataHandler } = props;
  const [open, setOpen] = React.useState(false);
  const [createUnit] = useMutation(CREATE_UNIT);

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
   console.log("FORM DATA ",formObject)
    createUnit({
      variables: {
        name: formObject.name,
        subject: formObject.subject,
      },
      refetchQueries: [{ query: GET_SUBJECT_BY_ID, variables: { id: props.selectedSubject.id} }],
    })
      .then((res) => {
        console.log("Created Unit", res);
      })
      .catch((err) => {
        throw new Error("Error in creating Unit");
      });
       if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    setFormObject(formObjectInit);
    console.log("Unit added ", formObject);
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
      <Tooltip title="UNIT">
        <IconButton size="small" aria-label="USERA" onClick={handleClickOpen}>
          <LibraryBooksOutlinedIcon className={classes.formObjectIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="subformObjectform-dialog-title"
      >
        <DialogTitle id="subformObjectform-dialog-title">
          Create Unit
        </DialogTitle>
        <DialogContent>
          <DialogContentText>"UNIT"</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Unit Name"
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

export default UnitDialog;
