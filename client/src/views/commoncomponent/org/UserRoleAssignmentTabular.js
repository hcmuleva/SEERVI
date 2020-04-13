import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ASSIGN_ORGADMIN_TO_USERS } from "../../../graphql/mutations/roles/rolemgmt";
import { GET_ORGBYID } from "../../../graphql/queries/administration/org";

import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
export default function UserRoleAssignmentTabular(props) {
  function iconStyles(type) {
    return {
      formObjectIcon: {
        color: "blue",
      },
    };
  }
  const classes = makeStyles(iconStyles)(props.type);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [usrSelected, setUsrSelected] = useState({});
  const [users, setUsers] = useState(null);
  const [assignOrgAdminRole] = useMutation(ASSIGN_ORGADMIN_TO_USERS);

  const [roleAssingData, setRoleAssingData] = useState([]);
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
      setUsrSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      setUsers(allRows);
      console.log("ALLROWS ", allRows);
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
    <div>
      <UserDisplay
        data={users}
        userList={orgRoleData.orgById.author}
        roleAssingData={setRoleAssingData}
      />
      {usrSelected && usrSelected.rowsSelected ? (
        <button
          onClick={() => {
            const roles = orgRoleData.orgById.orgRoles.filter((orgrole) => {
              console.log("orgRoles", orgrole);
              if (orgrole.name === "ORGADMIN") return orgrole;
            });
            console.log("Filtered", roles);
            if (!usrSelected || usrSelected === undefined) {
              throw new Error("Select User first");
            }
            let users = [];
            for (var value of usrSelected.rowsSelected) {
              console.log(
                "Value Pused",
                value,
                "   and ",
                orgRoleData.orgById.author[value].id
              );
              users.push({ id: orgRoleData.orgById.author[value].id });
            }

            assignOrgAdminRole({
              variables: {
                id: roles[0].id,
                users: users,
              },
              refetchQueries: [
                { query: GET_ORGBYID, variables: { id: props.orgid } },
              ],
            })
              .then((res) => {
                console.log("ORGADMIN ROLE Assignment", res);
                const userid = res.data.createUser.user.id;
                let users = [];
              })
              .catch((err) => {
                return new Error("Error in AssignRole", err);
              });
          }}
        >
          Save
        </button>
      ) : (
        ""
      )}
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={"User Roles Assignment"}
          data={orgRoleData.orgById.author}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

function UserDisplay(props) {
  return props.data
    ? props.data.map((usr, index) => {
        return <Chip label={props.userList[usr.index].email} key={index} />;
      })
    : "";
}
