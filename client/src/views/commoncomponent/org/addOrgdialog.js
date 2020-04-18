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
import { CREATE_ORG } from "../../../graphql/mutations/administration/org/orgmgmt";
import { GET_ORGS } from "../../../graphql/queries/administration/org";
import { CREATE_ORGROLE } from "../../../graphql/mutations/roles/rolemgmt";

import { useQuery, useMutation } from "@apollo/react-hooks";

const formObjectInit = {
  name: "",
  description: "",
  logo: "tbd",
};

const CreateOrgDialog = () => {
  const [formObject, setFormObject] = useState(formObjectInit);
  const [orgRoleCreate] = useMutation(CREATE_ORGROLE);

  const [open, setOpen] = React.useState(false);
  const [createOrg] = useMutation(CREATE_ORG);
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
    createOrg({
      variables: {
        name: formObject.name,
        description: formObject.description,
        logo: formObject.logo,
      },
      refetchQueries: [{ query: GET_ORGS }],
    })
      .then((res) => {
        console.log(
          "Created Orgres.data.createOrganization",
          res.data.createOrganization
        );
        orgRoleCreate({
          variables: {
            name: "ORGADMIN",
            description: "DEFAULT CREATED",
            org: res.data.createOrganization.id,
          },
        }).then((roleResp) => {
          console.log("Role ORGADMIN  CREATION DATA", roleResp);
        });
      })
      .catch((err) => {
        throw new Error("Error in creating Org");
      });
    setFormObject(formObjectInit);
    console.log("Org added ", formObject);
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
      <Tooltip title="CREATE ORG">
        <IconButton size="small" aria-label="Org" onClick={handleClickOpen}>
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
          Create Org
        </DialogTitle>
        <DialogContent>
          <DialogContentText>"ORG CREATE"</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Org Name"
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

CreateOrgDialog.propTypes = {
  createDataHandler: PropTypes.func.isRequired,
};

export default CreateOrgDialog;
