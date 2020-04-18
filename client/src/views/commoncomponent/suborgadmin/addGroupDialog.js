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
import { CREATE_GROUP } from "../../../graphql/mutations/group/groupmgmt";
import { CREATE_GROUPROLE } from "../../../graphql/mutations/roles/rolemgmt";
import { GET_SUBORGBYID } from "../../../graphql/queries/administration/suborg";

import { useQuery, useMutation } from "@apollo/react-hooks";

const formObjectInit = {
  name: "",
  description: "",
};

const CreateGroupDialog = (props) => {
  const [formObject, setFormObject] = useState(formObjectInit);
  const [open, setOpen] = React.useState(false);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [groupRoleCreate] = useMutation(CREATE_GROUPROLE);

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
    if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    createGroup({
      variables: {
        name: formObject.name,
        description: formObject.description,
        suborgid: props.suborgid,
      },
      refetchQueries: [
        { query: GET_SUBORGBYID, variables: { id: props.suborgid } },
      ],
    })
      .then((res) => {
        console.log(
          "createGroup res.data.createGroup.id",
          res.data.createGroup.id,
          "Fulll RESPONSE",
          res
        );
        groupRoleCreate({
          variables: {
            name: "GROUPADMIN",
            description: "DEFAULT CREATED",
            group: res.data.createGroup.id,
          },
        })
          .then((roleResp) => {
            console.log("Role  CREATION DATA", roleResp);
          })
          .catch((err) => {
            throw new Error("Error in creating Role");
          });
      })
      .catch((err) => {
        throw new Error("Error in creating Group");
      });

    setFormObject(formObjectInit);
    console.log("Group Created ", formObject);
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
  const classes = makeStyles(iconStyles);

  return (
    <div>
      <Tooltip title="CREATE GROUP">
        <IconButton size="small" aria-label="SubOrg" onClick={handleClickOpen}>
          <AddIcon className={classes.formObjectIcon} />
          <GroupWorkIcon className={classes.formObjectIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="subformObjectform-dialog-title"
      >
        <DialogTitle id="subformObjectform-dialog-title">
          Create GROUP
        </DialogTitle>
        <DialogContent>
          <DialogContentText>"GROUP CREATE"</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={formObject.name}
            onChange={handleChange("name")}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={formObject.description}
            onChange={handleChange("description")}
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

export default CreateGroupDialog;
