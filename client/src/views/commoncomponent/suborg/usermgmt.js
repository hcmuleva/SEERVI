import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import Chip from "@material-ui/core/Chip";

import { GET_ORGBYID } from "../../../graphql/queries/administration/org";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { ASSIGN_ROLE_TO_USERS } from "../../../graphql/mutations/roles/rolemgmt";
import CreateUserDataDialog from "../org/addUserDialog";
export default function UserMgmt(props) {
  console.log("PROPERTY in userManagement", props);
  const classes = makeStyles(iconStyles)(props.type);
  function iconStyles(type) {
    return {
      formObjectIcon: {
        color: "blue",
      },
    };
  }

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [users, setUsers] = useState(null);
  const [roleAssingData, setRoleAssingData] = useState([]);
  const [assignOrgAdminRole] = useMutation(ASSIGN_ROLE_TO_USERS);

  const [usrSelected, setUsrSelected] = useState({});
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
    selectableRows: "multiple",
    responsive: "scrollMaxHeight",
    rowsSelected: usrSelected.rowsSelected,

    onRowClick: (rowData, rowMeta) => {},
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
            let users = [];
            for (var value of usrSelected.rowsSelected) {
              users.push({ id: orgRoleData.orgById.author[value].id });
            }

            assignOrgAdminRole({
              variables: {
                id: props.roledata.id,
                users: users,
              },
              refetchQueries: [
                { query: GET_ORGBYID, variables: { id: props.orgid } },
              ],
            })
              .then((res) => {
                console.log("USER SELECTED ", JSON.stringify(usrSelected));
                setUsrSelected({ rowsSelected: [] });
                console.log("ORGADMIN ROLE Assignment", res);
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
      <CreateUserDataDialog orgid={props.orgid} query={GET_ORGBYID} />
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={props.title}
          data={orgRoleData.orgById.author}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}
UserMgmt.defaultProps = {
  title: "Admin Assignment",
};
function UserDisplay(props) {
  return props.data
    ? props.data.map((usr, index) => {
        return <Chip label={props.userList[usr.index].email} key={index} />;
      })
    : "";
}
