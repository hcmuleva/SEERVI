import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SubjectSelection(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <div>
      <InputLabel id="subject-select-label1">Subject</InputLabel>
      <Select
        id="subject-select-label1"
        value={selectedSubject}
        onChange={(e) => {
          console.log(
            "HCMSELECTED SUBJECT",
            e.target.name,
            "  and E ",
            e.target
          );
          const name = e.target.value;
          console.log("NAME ", name);
          console.log("e.target ", e.target);
          setSelectedSubject(name);
        }}
      >
        {props.mySubjectList.map((sub, index) => (
          <MenuItem key={sub.id} value={sub.id}>
            {sub.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
