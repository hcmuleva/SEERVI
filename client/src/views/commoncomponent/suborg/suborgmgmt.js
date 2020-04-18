import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from "shards-react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import EditIcon from "@material-ui/icons/Edit";
import { GET_SUBORGS } from "../../../graphql/queries/administration/suborg";
import { DELETE_SUBORG } from "../../../graphql/mutations/administration/suborg/suborgmgmt";
import CreateSubOrgDialog from "./addSubOrgDialog";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import UserMgmt from "../../commoncomponent/suborg/usermgmt";
import SubOrgroleAssignmentController from "./subOrgroleAssignmentController";
export default function Suborgmgmt(props) {
  const [deleteSubOrganization] = useMutation(DELETE_SUBORG);
  const [isOrgAdminCreate, setIsOrgAdminCreate] = useState(false);
  const [rowSelected, setRowSelected] = useState();
  const {
    loading: suborgLoading,
    error: suborgError,
    data: suborgData,
  } = useQuery(GET_SUBORGS, { variables: { id: props.orgid } });
  if (suborgError) return <p>SUBORG ERROR: {suborgError.message}</p>;
  if (suborgData === undefined) return <p>ERROR</p>;
  if (suborgLoading) {
    return <div>SUBORG Loading</div>;
  }
  console.log("suborgData", suborgData);
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
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() => {
                deleteSubOrganization({
                  variables: { id: tableMeta.rowData[0] },
                  refetchQueries: [
                    { query: GET_SUBORGS, variables: { id: props.orgid } },
                  ],
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
    // {
    //   name: "Edit",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <button
    //           onClick={() => {
    //             //props.editHandler(true);
    //             //props.editData(tableMeta.rowData);
    //             console.log("Edit Button Clicked ", tableMeta.rowData);
    //           }}
    //         >
    //           <EditIcon color="primary">Edit</EditIcon>
    //         </button>
    //       );
    //     },
    //   },
    // },
  ];
  const options = {
    print: false,
    download: false,
    selectableRows: "none",
    elevation: 10,
    expandableRows: true,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex, expandedRows) => {
      console.log("DATA index", dataIndex, "   expandRows", expandedRows);
      // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
      if (
        expandedRows.data.length > 4 &&
        expandedRows.data.filter((d) => d.dataIndex === dataIndex).length === 0
      )
        return false;
      return true;
    },
    rowsExpanded: [],
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      console.log("Suborg Data ", rowData[0], "  Suborgname ", rowData[1]);
      return (
        <SubOrgroleAssignmentController orgid={props.orgid} id={rowData[0]} />
      );
    },
    onRowsExpand: (curExpanded, allExpanded) => {
      console.log("hhhh=>", curExpanded, allExpanded);
    },

    onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF SUBORG =>", rowData);
    },
  };
  return (
    <div>
      <CreateSubOrgDialog orgid={props.orgid} />
      <MUIDataTable
        title="SubOrg Management"
        data={suborgData.suborgsoforg}
        columns={columns}
        options={options}
      />
    </div>
  );
}
