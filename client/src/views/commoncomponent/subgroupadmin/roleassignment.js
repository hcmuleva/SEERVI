import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../../components/common/PageTitle";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { GET_SUBGROUPBYID } from "../../../graphql/queries/subgroup/subgroup";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Chip, FontIcon, SvgIcon } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  ASSIGN_ROLE_TO_USERS,
  ASSIGN_USER_TO_ROLES,
} from "../../../graphql/mutations/roles/rolemgmt";
import UserChipComponent from "./userChipComponent";
const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));
export default function Roleassignment(props) {
  const classes = makeStyles(iconStyles)(props.type);
  const [rolechecked, setRoleChecked] = React.useState(false);
  const [userchecked, setUserChecked] = React.useState(true);

  function iconStyles(type) {
    return {
      formObjectIcon: {
        color: "blue",
      },
    };
  }
  console.log("Roleassignment--> props ", props);
  const [usrSelected, setUsrSelected] = useState({});
  const [roleSelected, setRoleSelected] = useState({});
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
  const [assignRoleToUsers] = useMutation(ASSIGN_ROLE_TO_USERS);
  const [assignUserToRoles] = useMutation(ASSIGN_USER_TO_ROLES);
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
  console.log("subgroupData groupById", subgroupData.subgroupById);
  const myOrg = subgroupData.subgroupById.groupid.suborgid.org;
  const orgid = myOrg.id;
  const orgname = myOrg.name;
  const authorList = subgroupData.subgroupById.groupid.suborgid.org.author;
  let usrSelectionMode = userchecked ? "multiple" : "single";
  let roleSelectionMode = rolechecked ? "multiple" : "single";

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
    selectableRows: usrSelectionMode,
    responsive: "scrollMaxHeight",
    rowsSelected: usrSelected.rowsSelected,

    onRowClick: (rowData, rowMeta) => {},
    onRowsSelect: (rowsSelected, allRows) => {
      setUsrSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
    },
  };
  const rolecolumns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    { name: "name", label: "RoleName" },
  ];
  const toggleChecked = () => {
    setRoleChecked((prev) => !prev);
    setUserChecked((prev) => !prev);
  };

  const roleoptions = {
    filter: true,
    filterType: "dropdown",
    selectableRows: roleSelectionMode,
    responsive: "scrollMaxHeight",
    rowsSelected: roleSelected.rowsSelected,

    onRowClick: (rowData, rowMeta) => {},
    onRowsSelect: (rowsSelected, allRows) => {
      setRoleSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
    },
  };
  const roletheme = createMuiTheme({
    overrides: { MUIDataTableToolbar: { root: { display: "none" } } },
  });
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="RoleAssignment"
          subtitle="Blog Posts"
          className="text-sm-left"
        />
        <MultiSelect
          userchecked={userchecked}
          rolechecked={rolechecked}
          toggleChecked={toggleChecked}
        />
      </Row>
      <Row>
        <Col lg="3" md="12">
          {usrSelected && usrSelected.rowsSelected
            ? usrSelected.rowsSelected.map((val, index) => {
                return (
                  <UserChipComponent
                    key={authorList[val].id}
                    user={authorList[val].email}
                    id={authorList[val].id}
                    rootstyle={useStyles}
                  />
                );
              })
            : ""}
        </Col>
        <Col lg="3" md="12">
          <h6>Role Selected</h6>
          {roleSelected && roleSelected.rowsSelected
            ? roleSelected.rowsSelected.map((val, index) => {
                return (
                  <div style={styles.wrapper} key={index}>
                    <Chip
                      label={subgroupData.subgroupById.subgroupRoles[val].name}
                      key={index}
                      style={{
                        margin: "8px 8px 0 0",
                        float: "left",
                      }}
                    />
                  </div>
                );
              })
            : ""}
        </Col>
        <button
          onClick={() => {
            if (userchecked) {
              let userList = [];
              usrSelected.rowsSelected.map((val, index) => {
                userList.push({ id: myOrg.author[val].id });
              });

              let roleid =
                subgroupData.subgroupById.subgroupRoles[
                  roleSelected.rowsSelected[0]
                ].id;

              assignRoleToUsers({
                variables: {
                  id: roleid,
                  users: userList,
                },

                refetchQueries: [
                  { query: GET_SUBGROUPBYID, variables: { id: props.id } },
                ],
              })
                .then((res) => {
                  console.log("Bulk Users Assignment to a Role", res);

                  setUsrSelected([]);
                  setRoleSelected([]);
                })
                .catch((err) => {
                  return new Error("Error in AssignRole", err);
                });
            } else if (rolechecked) {
              let roleList = [];
              roleSelected.rowsSelected.map((val, index) => {
                roleList.push({
                  id: subgroupData.subgroupById.subgroupRoles[val].id,
                });
              });
              let userId = myOrg.author[usrSelected.rowsSelected[0]].id;
              assignUserToRoles({
                variables: {
                  id: userId,
                  roles: roleList,
                },

                refetchQueries: [
                  { query: GET_SUBGROUPBYID, variables: { id: props.id } },
                ],
              })
                .then((res) => {
                  console.log("Bulk ROLE Assignment to a User", res);
                  setUsrSelected([]);
                  setRoleSelected([]);
                })
                .catch((err) => {
                  return new Error("Error in AssignRole", err);
                });
            }
          }}
        >
          Save
        </button>
      </Row>
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <MuiThemeProvider theme={theme}>
            <MUIDataTable
              title="USER ROLE ASSIGNMENT"
              data={myOrg.author}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          <MuiThemeProvider theme={roletheme}>
            <MUIDataTable
              title="USER ROLE ASSIGNMENT"
              data={subgroupData.subgroupById.subgroupRoles}
              columns={rolecolumns}
              options={roleoptions}
            />
          </MuiThemeProvider>
        </Col>
      </Row>
    </Container>
  );
}
function MultiSelect(params) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={params.userchecked}
            onChange={params.toggleChecked}
          />
        }
        label="MultiUser"
      />
    </FormGroup>
  );
}
