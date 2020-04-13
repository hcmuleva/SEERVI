import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from "shards-react";

import GroupWorkIcon from "@material-ui/icons/GroupWork";
import EditIcon from "@material-ui/icons/Edit";
import { GET_ORGS } from "../../../graphql/queries/administration/org";
import { DELETE_ORG } from "../../../graphql/mutations/administration/org/orgmgmt";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import OrgadminCreate from "./orgadminCreate";
export default function Orgtableview(props) {
  const [deleteOrganization] = useMutation(DELETE_ORG);
  const [isOrgAdminCreate, setIsOrgAdminCreate] = useState(false);
  const [rowSelected, setRowSelected] = useState();
  const { loading: orgLoading, error: orgError, data: orgData } = useQuery(
    GET_ORGS
  );
  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {
    return <div>ORG Loading</div>;
  }
  console.log("orgData", orgData);
  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    "name",
    "description",
    {
      name: "logo",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={tableMeta.rowData[3]}
                alt="Logo"
                width="110"
              />
            </div>
          );
        },
      },
    },

    {
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() => {
                deleteOrganization({
                  variables: { id: tableMeta.rowData[0] },
                  refetchQueries: [{ query: GET_ORGS }],
                })
                  .then((res) => {
                    console.log("Response", res);
                  })
                  .catch(function onReject(e) {
                    console.log("Error ", e);
                  });
              }}
            >
              <DeleteForeverIcon color="secondary">Delete</DeleteForeverIcon>
            </button>
          );
        },
      },
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() => {
                props.editHandler(true);
                props.editData(tableMeta.rowData);
                console.log("Edit Button Clicked ", tableMeta.rowData);
              }}
            >
              <EditIcon color="primary">Edit</EditIcon>
            </button>
          );
        },
      },
    },
  ];
  const options = {
    print: false,
    download: false,

    selectableRows: "none",
    onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF ORG =>", rowData);
      setRowSelected(rowData);
      setIsOrgAdminCreate(!isOrgAdminCreate);
    },
  };
  return (
    <div>
      {isOrgAdminCreate ? (
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <Col lg="6" md="12">
              <MUIDataTable
                data={orgData.allorgs}
                columns={columns}
                options={options}
              />
            </Col>
            <Col lg="1" md="2"></Col>
            <Col lg="4" md="12">
              <OrgadminCreate
                org={rowSelected}
                displayOrgAdmin={setIsOrgAdminCreate}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <MUIDataTable
          data={orgData.allorgs}
          columns={columns}
          options={options}
        />
      )}
    </div>
  );
}
