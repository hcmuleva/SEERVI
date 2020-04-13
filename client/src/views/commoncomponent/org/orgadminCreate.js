import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Card, CardBody, Form, FormInput } from "shards-react";
import { CREATE_USER_InOrg } from "../../../graphql/mutations/user/user";
import { CREATE_ORGROLE_ASSIGN_USER } from "../../../graphql/mutations/roles/rolemgmt";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function OrgadminCreate(props) {
  const formObjectInit = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    org: props.org[0],
  };
  const [formObject, setFormObject] = useState(formObjectInit);
  const handleChange = (formkey) => ({ target: { value } }) => {
    setFormObject({ ...formObject, [formkey]: value });
  };
  const [createUser] = useMutation(CREATE_USER_InOrg);
  const [createOrgRole] = useMutation(CREATE_ORGROLE_ASSIGN_USER);
  return (
    <div>
      <h4>Create Org Admin for {props.org[1]}</h4>
      <Card small className="mb-3">
        <TextField
          id="firsnameUserText"
          label="First Name"
          defaultValue=""
          variant="outlined"
          onChange={handleChange("firstname")}
        />
        <TextField
          id="outlined-helperText"
          label="Last Name"
          variant="outlined"
          onChange={handleChange("lastname")}
        />

        <TextField
          id="outlined-helperText"
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleChange("email")}
        />
        <TextField
          id="outlined-helperText"
          label="Password"
          type="password"
          defaultValue="Default Value"
          variant="outlined"
          onChange={handleChange("password")}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log(JSON.stringify(formObject));
            createUser({
              variables: {
                firstname: formObject.firstname,
                lastname: formObject.lastname,
                email: formObject.email,
                password: formObject.password,
                org: formObject.org,
              },
            })
              .then((res) => {
                console.log("Created ORGADMIN", res);
                const userid = res.data.createUser.user.id;
                let users = [];
                users.push({ id: userid });
                createOrgRole({
                  variables: {
                    name: "ORGADMIN",
                    org: formObject.org,
                    users: users,
                  },
                })
                  .then((roleResp) => {
                    console.log("ROLE CREATED SUCCESSFULLY", roleResp);
                    props.displayOrgAdmin(false);
                  })
                  .catch((err) => {
                    props.displayOrgAdmin(true);
                  });
              })
              .catch((err) => {
                props.displayOrgAdmin(true);
                throw new Error("Error in creating Org");
              });
          }}
        >
          Create
        </Button>
      </Card>
    </div>
  );
}
