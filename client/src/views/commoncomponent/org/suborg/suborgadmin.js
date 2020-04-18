import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ORGBYID } from "../../../graphql/queries/administration/org";

import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
function iconStyles(type) {
  return {
    formObjectIcon: {
      color: "blue",
    },
  };
}
export default function SuborgadminAssignmentTabular(props) {
  console.log("PROPS of UserRoleAssignmentTabular ", props);
  const classes = makeStyles(iconStyles)(props.type);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const {
    loading: orgRoleLoading,
    error: orgRoleError,
    data: orgRoleData,
  } = useQuery(GET_ORGBYID, { variables: { id: props.orgid } });
  if (orgRoleError) return <p>orgRole ERROR: {orgRoleError.message}</p>;
  if (orgRoleData === undefined) return <p>ERROR</p>;
  if (orgRoleLoading) {
    return <div>orgRole Loading</div>;
  }

  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    { name: "firstname", label: "FirstName" },
    "email",
    {
      label: "ROLES",
      name: "roles",
      options: {
        filter: true,
        filterType: "multiselect",
        customBodyRender: (value) => {
          return value.map((val, key) => {
            return <Chip label={val.name} key={val.id} />;
          });
        },
      },
    },
    {
      name: "AssignRoles",
      options: {
        customBodyRender: (value) => {
          return (
            <IconButton
              size="small"
              aria-label="USERA"
              onClick={(value) =>
                console.log("ASSIGN ORGADMIN", selectedRowData)
              }
            >
              <PersonAddIcon className={classes.formObjectIcon} />
            </IconButton>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    filterType: "dropdown",
    selectableRows: "multiple",
    responsive: "scrollMaxHeight",
    rowsSelected: usrSelected.rowsSelected,

    onRowClick: (rowData, rowMeta) => {
      console.log("Clicked rowData", rowData);

      setSelectedRowData(rowData);
    },
    onRowsSelect: (rowsSelected, allRows) => {
      allRows.map((row) => {
        console.log(
          "ROW=>",
          orgRoleData.orgById.author,
          "  indexed",
          row.dataIndex,
          "   dd",
          orgRoleData.orgById.author[row.dataIndex]
        );
      });
      // setUsrSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      // setUsers(allRows);
      //  console.log("ALLROWS ", allRows);
    },
  };

  const theme = createMuiTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          // Soft hide the button.
          visibility: "hidden",
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <MUIDataTable
        title={"User Roles Assignment"}
        data={orgRoleData.orgById.author}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
}

function UserDisplay(props) {
  return props.data
    ? props.data.map((usr, index) => {
        return <Chip label={props.userList[usr.index].email} key={index} />;
      })
    : "";
}
