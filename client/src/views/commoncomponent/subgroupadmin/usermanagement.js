import React from "react";
import CreateUserDataDialog from "./userAddDialog";
import { GET_SUBGROUPBYID } from "../../../graphql/queries/subgroup/subgroup";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Chip, FontIcon, SvgIcon } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MUIDataTable from "mui-datatables";
const theme = createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      fixedHeaderCommon: {
        backgroundColor: "lightblue",
        textAlign: "center",
      },
    },
    MUIDataTableDivider: {
      root: {
        backgroundColor: "#1D252D",
        color: "rgb(255, 255, 255)",
      },
    },

    MUIDataTableSelectCell: {
      headerCell: {
        background: "blue",
      },
    },
  },
});
export default function Usermanagement(props) {
  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    { name: "firstname", label: "FirstName" },
    { name: "lastname", label: "LastName" },
    { name: "email", label: "Email" },

    {
      label: "ROLES",
      name: "roles",
      options: {
        filter: true,
        filterType: "multiselect",
        customBodyRender: (value) => {
          return value.map((val, key) => {
            return (
              <Chip
                label={val.name}
                key={val.id}
                size="small"
                fontSize="6"
                color="primary"
              />
            );
          });
        },
      },
    },
  ];
  const options = {
    filter: true,
    filterType: "dropdown",
    selectableRows: "none",
    responsive: "scrollMaxHeight",
  };
  const {
    loading: subgroupLoading,
    error: subgroupError,
    data: subgroupData,
  } = useQuery(GET_SUBGROUPBYID, { variables: { id: props.id } });
  if (subgroupError) return <p>SUBORG ERROR: {subgroupError.message}</p>;
  if (subgroupData === undefined)
    return <p>ERROR in GETTing subgroup BY ID{props.id}</p>;
  if (subgroupLoading) {
    return <div>SUBORG Loading</div>;
  }
  console.log("HCMsubgroupData groupById", subgroupData.subgroupById);
  const myOrg = subgroupData.subgroupById.groupid.suborgid.org;
  const orgid = myOrg.id;
  console.log("orgid ", orgid);
  return (
    <div>
      <CreateUserDataDialog
        query={GET_SUBGROUPBYID}
        orgid={orgid}
        subgroupid={subgroupData.subgroupById.id}
      />
      <h4>Create User</h4>
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title="USER ROLE ASSIGNMENT"
          data={myOrg.author}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}
