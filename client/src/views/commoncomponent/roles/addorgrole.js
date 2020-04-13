import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_ORGROLE } from "../../../graphql/mutations/roles/rolemgmt";
import { GET_ALLORGS_ALLROLES } from "../../../graphql/queries/roles/roles";
import {  Button, Row, Col} from "shards-react";
import uploadFile from "../files/fileupload"
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function Addorg(props) {
  console.log("Addorgprops ",props)
  const classes = useStyles();
  const [orgRoleCreate] = useMutation(CREATE_ORGROLE);
  const createRoleFunction = () => {
    orgRoleCreate({
      variables: { name: document.getElementById("rolenameid").value, 
      description: document.getElementById("roledescriptionid").value,org:props.orgid},
      refetchQueries: [{ query: GET_ALLORGS_ALLROLES }]
    })
      .then(res => {
        console.log("Role  CREATION DATA", res);
      })
      .catch(err => {
        throw new Error("Error in creating Role");
      });
    document.getElementById("rolenameid").value = "";
    document.getElementById("roledescriptionid").value = "";
  };
   
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
      <Row>
        <TextField label="Role Name" id="rolenameid" defaultValue="" size="small" />
        <TextField label="Role Description" id="roledescriptionid" defaultValue="" size="small" />
       
        </Row>
      </div>
       <Button onClick={createRoleFunction}>Create</Button>
    </form>
    </div>
  );
}
