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
import { CREATE_SUBJECT } from "../../../../graphql/mutations/education/subject";
import {GET_ALLSUBJECTS} from "../../../../graphql/queries/education/subject"
import { useQuery, useMutation } from "@apollo/react-hooks";
import DropZoneUploader from "../../../commoncomponent/files/DropZoneUploader"
const formObjectInit = {
  name: "",
  picture: "",
  medium: "",
  std: "",
  category:"",
  board:"CBSE",

  subgroup: "",
  isPublished:true,
  state:"ACTIVE",
  status:"APPROVED",
  available:"FREE",
  description: ""

  
};

const CreateSubjectDialog = (props) => {
  const [fileURL, setFileURL] = useState("")
  formObjectInit["medium"] = props.medium;
  formObjectInit["std"] = props.std;
  formObjectInit["subgroup"] = localStorage.getItem("subgroupid");
  const [formObject, setFormObject] = useState(formObjectInit);
  const [open, setOpen] = React.useState(false);
  const [subjectCreate] = useMutation(CREATE_SUBJECT);

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
    


  
    subjectCreate({
      variables: {
        name: formObject.name,
        picture: fileURL,
        medium: formObject.medium,
        std: formObject.std,
        category: formObject.category,
        board: formObject.board,
        group: formObject.group,
        subgroup: formObject.subgroup,
        isPublished: formObject.isPublished,
        state: formObject.state,
        status:formObject.status,
        available:formObject.available,
        description: formObject.description,
        
      },
      refetchQueries: [{ query: GET_ALLSUBJECTS}],
    })
      .then((res) => {
        console.log(
          "createSubject res.data.createSubject",
          res.data.createSubject,
          "RESPONSE",
          res
        );
        
      })
      .catch((err) => {
        throw new Error("Error in creating SubOrg");
      }); 

    setFormObject(formObjectInit);
    console.log("Subject added ", formObject);
        if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
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
  console.log("FILE URL FROM SUBJECT ADD DIALOG",fileURL)
  return (
    <div>
      <Tooltip title="CREATE Subject">
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
          Create Subject
        </DialogTitle>
        <DialogContent>
          <DialogContentText>"Subject CREATE"</DialogContentText>
          <TextField
            autoFocus
            
            margin="dense"
            label="Subject Name"
            type="text"
            fullWidth
            value={formObject.name}
            onChange={handleChange("name")}
          />
          {fileURL?"":<DropZoneUploader setFileURL={setFileURL}/>}
        

         <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={formObject.category}
            onChange={handleChange("category")}
          />
           <TextField
            margin="dense"
            label="board"
            type="text"
            fullWidth
            value={formObject.board}
            onChange={handleChange("board")}
          />
           <TextField
            margin="dense"
            label="isPublished"
            type="text"
            fullWidth
            value={formObject.isPublished}
            onChange={handleChange("isPublished")}
          />
           <TextField
            margin="dense"
            label="state"
            type="text"
            fullWidth
            value={formObject.state}
            onChange={handleChange("state")}
          />
           <TextField
            margin="dense"
            label="status"
            type="text"
            fullWidth
            value={formObject.status}
            onChange={handleChange("status")}
          />
           <TextField
            margin="dense"
            label="available"
            type="text"
            fullWidth
            value={formObject.available}
            onChange={handleChange("available")}
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

export default CreateSubjectDialog;
