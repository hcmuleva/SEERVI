import React from "react";
import { useQuery ,useMutation} from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";

import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { GET_ALLROLES } from "../../../graphql/queries/roles/roles";
import {DELETE_ROLE} from "../../../graphql/mutations/roles/rolemgmt"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function Role() {
    console.log("ROLE called")
  const [deleteRole] = useMutation(DELETE_ROLE);

  const { loading: roleLoading, error: roleError, data: roleData } = useQuery(
    GET_ALLROLES
  );
  if (roleError) return <p>role ERROR: {roleError.message}</p>;
  if (roleData === undefined) return <p>ERROR</p>;
  if (roleLoading) {
    return <div>role Loading</div>;
  }
 console.log("roleData",roleData)
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
                  refetchQueries: [{ query: GET_ALLROLES }]
                })
                  .then(res => {
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
        }
      }
    }
    
  ];
  const options = {
    print: false,
    download: false,

    selectableRows: "none"
  };
  return (
    <div>
      <MUIDataTable
        data={roleData.roles}
        columns={columns}
        options={options}
      />
    </div>
  );
}
