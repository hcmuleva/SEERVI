import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

export default function UserChipComponent(props) {
  const classes = props.rootstyle();

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div className={classes.root}>
      <Chip
        key={props.user}
        icon={<FaceIcon />}
        label={props.user}
        onClick={handleClick}
        onDelete={handleDelete}
        variant="outlined"
      />
    </div>
  );
}
