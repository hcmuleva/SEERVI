import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "20ch",
      fontSize: 8,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 90,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ContentForm(props) {
  const classes = useStyles();
  const [level, setLevel] = useState(1);

  const handleChange = (event) => {
    const name = event.target.name;
    console.log("NAME ", name, " Value ", event.target.value);
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="Title-outlined-required"
          label="Title"
          variant="outlined"
          onChange={(e) => {
            props.setFormObject({
              ...props.formObject,
              ["name"]: e.target.value,
            });
          }}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="level-select-label">Level</InputLabel>

          <Select
            labelId="level-select-label"
            id="level-simple-select"
            value={level}
            onChange={(e) => {
              const name = e.target.name;
              setLevel(e.target.value);
              props.setFormObject({
                ...props.formObject,
                ["number"]: parseInt(e.target.value),
              });
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="isPublished-required"
          label="isPublished"
          defaultValue="YES"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="state-outlined-required"
          label="State"
          defaultValue="ACTIVE"
          labelStyle={{ fontSize: 8 }}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          required
          id="status-required"
          label="status"
          defaultValue="APPROVED"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </div>
    </form>
  );
}
