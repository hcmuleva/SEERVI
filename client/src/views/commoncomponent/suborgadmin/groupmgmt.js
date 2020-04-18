import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from "shards-react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import EditIcon from "@material-ui/icons/Edit";
import { GET_SUBORGBYID } from "../../../graphql/queries/administration/suborg";
import { DELETE_GROUP } from "../../../graphql/mutations/group/groupmgmt";
import CreateGroupDialog from "./addGroupDialog";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import GroupRoleAssignmentController from "./groupRoleAssignmentController";
export default function Groupmgmt(props) {
  console.log("PROPS for group management ", props);
  const [deleteGroup] = useMutation(DELETE_GROUP);
  const [rowSelected, setRowSelected] = useState();
  const {
    loading: suborgLoading,
    error: suborgError,
    data: suborgData,
  } = useQuery(GET_SUBORGBYID, { variables: { id: props.suborgid } });
  if (suborgError) return <p>SUBORG ERROR: {suborgError.message}</p>;
  if (suborgData === undefined) return <p>ERROR in GETTing SUBORG BY ID</p>;
  if (suborgLoading) {
    return <div>SUBORG Loading</div>;
  }
  console.log("suborgData", suborgData);
  const orgid = suborgData.suborgById.org.id;
  const suborgid = suborgData.suborgById.id;
  console.log("suborgData.suborgById.org.id  ==>", orgid);
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
                deleteGroup({
                  variables: { id: tableMeta.rowData[0] },
                  refetchQueries: [
                    {
                      query: GET_SUBORGBYID,
                      variables: { id: suborgid },
                    },
                  ],
                })
                  .then((res) => {
                    console.log("Response for Delete Group", res);
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
  ];
  const options = {
    print: false,
    download: false,
    selectableRows: "none",
    expandableRows: true,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex, expandedRows) => {
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
      console.log("Group Data ", rowData[0], "  Groupname ", rowData[1]);
      return <GroupRoleAssignmentController orgid={orgid} id={rowData[0]} />;
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
      <CreateGroupDialog suborgid={suborgid} />
      <MUIDataTable
        title="Group Management"
        data={suborgData.suborgById.userGroups}
        columns={columns}
        options={options}
      />
    </div>
  );
}
