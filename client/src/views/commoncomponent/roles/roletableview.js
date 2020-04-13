import React from 'react'
import MUIDataTable from "mui-datatables";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useQuery ,useMutation} from "@apollo/react-hooks";

import { GET_ALLORGS_ALLROLES } from "../../../graphql/queries/roles/roles";
import {DELETE_ROLE} from "../../../graphql/mutations/roles/rolemgmt"
import Swal from 'sweetalert2'
export default function RoleTableView(props) {
    console.log("props=>",props)
      const [deleteRole] = useMutation(DELETE_ROLE);

    const options = {
    selectableRows: "none",
    onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF SUBORG =>", rowData);
      if(props.roleSelected){
         console.log("PROPS roleSelected  is there ",rowData)
         props.roleSelected(rowData)
      }
     
    },
    print: false,
    download:false,
    filter: true,
    filterType: "textField",
    elevation: 2,
    rowsPerPage: 5,
     rowsPerPageOptions: [5, 10, 15, 20],
   
  }
  const columns = [
    {
      name: "id",
      options: {
        display: false
      }
    },
    "name",
    "description",
     {
      name: "orgRoles",
      options: {
        display: false
      }
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
                deleteRole({
                  variables: { id: tableMeta.rowData[0] },
                  refetchQueries: [{ query: GET_ALLORGS_ALLROLES }]
                })
                  .then(res => {
                    console.log("Response", res);
                  })
                  .catch(function onReject(e) {
                    console.log("Error ", e);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops... Delete Error',
                      text: 'Something went wrong!',
                      footer: `<a href>${e.message}</a>`
                    })
                  });
              }}
            >
              <DeleteForeverIcon color="secondary">Delete</DeleteForeverIcon>
            </button>
          );
        }
      }
    },
  ]

    return ( <MUIDataTable
        data={props.roles}
        columns={columns}
        options={options}
      />)
}
