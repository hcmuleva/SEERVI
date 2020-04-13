import React, { useState } from "react";

export default function assignRoledialog(props) {
  const [open, setOpen] = useState(false);

  const handleSwitchChange = (stdname) => (event) => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (event) => {
    console.log("HandleAdd");
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
}

CreateUserDataDialog.propTypes = {
  createDataHandler: PropTypes.func.isRequired,
};

export default CreateUserDataDialog;
