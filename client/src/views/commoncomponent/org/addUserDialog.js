import React, { useState } from "react";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

import GroupWorkIcon from "@material-ui/icons/GroupWork";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

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
import { CREATE_ORGROLE_ASSIGN_USER } from "../../../graphql/mutations/roles/rolemgmt";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_USER_InOrg } from "../../../graphql/mutations/user/user";

const formObjectInit = {
  firstname: "",
  lastname: "",
  password: "",
  email: "",
  org: "",
};

const CreateUserDataDialog = (props) => {
  console.log("CREATE USER DATA DIaLOG from addUserDialog", props);
  formObjectInit["org"] = props.orgid;
  const [formObject, setFormObject] = useState(formObjectInit);
  const { createDataHandler } = props;
  const [open, setOpen] = React.useState(false);
  const [createUser] = useMutation(CREATE_USER_InOrg);
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
    createUser({
      variables: {
        firstname: formObject.firstname,
        lastname: formObject.lastname,
        email: formObject.email,
        password: formObject.password,
        org: formObject.org,
      },
      refetchQueries: [{ query: props.query, variables: { id: props.orgid } }],
    })
      .then((res) => {
        console.log("Created User", res);
      })
      .catch((err) => {
        throw new Error("Error in creating User");
      });
    setFormObject(formObjectInit);
    console.log("User added ", formObject);
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
      <Tooltip title="USER">
        <IconButton size="small" aria-label="USERA" onClick={handleClickOpen}>
          <PersonAddIcon className={classes.formObjectIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="subformObjectform-dialog-title"
      >
        <DialogTitle id="subformObjectform-dialog-title">
          Create USER for Org {props.orgname}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>"USER CREATE TEXT"</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={formObject.firstname}
            onChange={handleChange("firstname")}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={formObject.lastname}
            onChange={handleChange("lastname")}
          />

          <TextField
            margin="dense"
            label="Password"
            type="text"
            fullWidth
            value={formObject.password}
            onChange={handleChange("password")}
          />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={formObject.email}
            onChange={handleChange("email")}
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

export default CreateUserDataDialog;
