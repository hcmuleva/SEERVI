import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';

import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_ORG } from "../../../graphql/mutations/administration/org/orgmgmt";
import { GET_ORGS } from "../../../graphql/queries/administration/org";
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

export default function Addorg() {
  const classes = useStyles();
  const [orgCreate] = useMutation(CREATE_ORG);
  const [logo, setLogo]=useState(null)
  const [myFile,setMyFile]=useState(null)
  const createOrgFunction = () => {
      console.log("logo =>",logo)
    orgCreate({
      variables: { name: document.getElementById("orgnameid").value, 
      description: document.getElementById("orgdescriptionid").value ,logo},
      refetchQueries: [{ query: GET_ORGS }]
    })
      .then(res => {
        console.log("ORG  CREATION DATA", res);
      })
      .catch(err => {
        throw new Error("Error in creating Org");
      });
    document.getElementById("orgnameid").value = "";
    document.getElementById("orgdescriptionid").value = "";
  };
//   const onDrop=([file])=>{
//       console.log("ON DROP",file)
//       uploadFile(file).then((logourl)=>{
//           console.log("URL ",logourl)
//           setLogo(logourl)
//       })
      
//   }
   
  return (
    <div>
      <h1>Add Org</h1>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
      <Row>
        <TextField label="ORG Name" id="orgnameid" defaultValue="" size="small" />
        <TextField label="ORG Description" id="orgdescriptionid" defaultValue="" size="small" />
       <input type="file" onChange={(e)=>{
            uploadFile(e.target.files[0]).then((resp)=>{
                setLogo(resp)
                console.log("uploadFileRESP ",resp)
                    

            }).catch((err)=>{
                console.log("ERROR ",err)
            })
       }} />
        </Row>
      </div>
       <Button onClick={createOrgFunction}>Create</Button>
    </form>
    </div>
  );
}
