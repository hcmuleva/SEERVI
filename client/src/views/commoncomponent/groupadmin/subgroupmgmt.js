import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from "shards-react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import EditIcon from "@material-ui/icons/Edit";
import { GET_GROUP_BY_ID } from "../../../graphql/queries/group/group";
import { DELETE_SUBGROUP } from "../../../graphql/mutations/subgroup/subgroupmgmt";
//import CreateGroupDialog from "./addGroupDialog";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import SubGroupRoleAssignmentController from "./subGroupRoleAssignmentController";
import CreateSubGroupDialog from "./addSubGroupDialog";
export default function Subgroupmgmt(props) {
  console.log("PROPS for group management ", props);
  const [deleteSubGroup] = useMutation(DELETE_SUBGROUP);
  const [rowSelected, setRowSelected] = useState();
  const {
    loading: groupLoading,
    error: groupError,
    data: groupData,
  } = useQuery(GET_GROUP_BY_ID, { variables: { id: props.groupid } });
  if (groupError) return <p>SUBORG ERROR: {groupError.message}</p>;
  if (groupData === undefined)
    return <p>ERROR in GETTing Group BY ID{props.groupid}</p>;
  if (groupLoading) {
    return <div>SUBORG Loading</div>;
  }
  console.log("groupData groupById", groupData.groupById);
  const orgid = groupData.groupById.suborgid.org.id;
  const groupid = groupData.groupById.id;
  console.log("groupData.groupById.suborgid.org.id  ==>", orgid);
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
                deleteSubGroup({
                  variables: { id: tableMeta.rowData[0] },
                  refetchQueries: [
                    {
                      query: GET_GROUP_BY_ID,
                      variables: { id: groupid },
                    },
                  ],
                })
                  .then((res) => {
                    console.log("Response for Delete SubGroup", res);
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
      console.log("Expandded Rows data in subgroupmgmt ", rowData);
      const colSpan = rowData.length + 1;
      console.log(
        "SubGroup Data ",
        rowData[0],
        "  SubGroupname ",
        rowData[1],
        " ORG Id ",
        orgid
      );
      return <SubGroupRoleAssignmentController orgid={orgid} id={rowData[0]} />;
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
      <CreateSubGroupDialog groupid={groupid} />
      <MUIDataTable
        title="SUBGROUP Management"
        data={groupData.groupById.subgroups}
        columns={columns}
        options={options}
      />
    </div>
  );
}
