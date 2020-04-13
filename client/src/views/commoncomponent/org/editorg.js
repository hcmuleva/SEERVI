import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_ORG } from "../../../graphql/mutations/administration/org/orgmgmt";
import { GET_ORGS } from "../../../graphql/queries/administration/org";
import {  Button, Row, Col} from "shards-react";
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function Editorg(props) {
  console.log("PROPS for editORG data ",props.data) 
  const classes = useStyles();
  const [updateOrg] = useMutation(UPDATE_ORG);
  const propDescription=props.data[2]!==null?props.data[2]:""

  const updateOrgFunction = () => {
    updateOrg({
      variables: { id:props.data[0], name: document.getElementById("updateorgnameid").value ,
                     description:document.getElementById("updateorgdescriptionid").value
            },
      refetchQueries: [{ query: GET_ORGS }]
    })
      .then(res => {
        console.log("ORG  CREATION DATA", res);
      })
      .catch(err => {
        throw new Error("Error in creating Org");
      });
    document.getElementById("updateorgnameid").value = "";
    document.getElementById("updateorgdescriptionid").value = "";
  };
  return (
    <div>
      <h1>Add Org</h1>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField label="ORG Name" id="updateorgnameid" defaultValue={props.data[1]} size="small" />
        <TextField label="ORG Description" id="updateorgdescriptionid" defaultValue={propDescription} size="small" />
      </div>
       <Button onClick={updateOrgFunction}>Update</Button>
    </form>
    </div>
  );
}
