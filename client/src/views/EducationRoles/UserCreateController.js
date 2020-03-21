import React, {useState} from 'react'
import UserCreateDialog from './UserCreateDialog'
import { useQuery, useMutation } from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables"; 

import RadioButtons from './RadioButtons'
import {
  GET_ORGROLES,
  
} from "../../views/queries/getAllOrgs";
import MyTreeItem from './MyTreeItem'
export default function UserCreateController() {
     const [rowSel, setRowSel] = useState({});
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [userRole,setUserRole]=useState(null)
     const metaData=JSON.parse(localStorage.getItem('metadata'))
    const { loading:orgRoleLoading, error:orgRoleError, data:orgRoleData } = useQuery(GET_ORGROLES,{variables:{id:metaData.org.id}})
   
  if (orgRoleError) return <p>SUBGROUP ERROR: {orgRoleError.message}</p>;
  if (orgRoleData === undefined) return <p>ORG ROLE ERROR</p>;
  if (orgRoleLoading) {return <div>OrgRole Loading</div>;}
  console.log("orgRoleData",orgRoleData)
    const userCreateDataHandler =(farmdata)=>{
        console.log("Form data for create user",farmdata)
    }
    console.log("userRole iin Controller",userRole)
    //GetAll USERS to show in below table....  //rowsPerPage
    const columns=[
     {name:"id",
    options: {
          display: false,
        }

    },"name"
  ]
  const options = {
    selectableRows: "single",
    rowsPerPage:3,
    rowsSelected: rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      console.log("allRows.map(row => row.dataIndex)",allRows.map(row => row.dataIndex));
      console.log("selected Row value ",orgRoleData.orgRoles[allRows.map(row => row.dataIndex)])
      //props.mediumSelectHandler(mediumData.getAllMedium[allRows.map(row => row.dataIndex)])
      //seRowSel({ rowsSelected: allRows.map(row => row.dataIndex) });
      //console.log("seRowSel",seRowSel)
    },
    onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF SUBORG =>", rowData);
      //props.mediumSelectHandler(rowData);
    },
    onRowsDelete: rowsDeleted => {
      console.log(
        rowsDeleted.data[0].index,
        "were deleted!",
        " and value"
        
      );
    }
  }

    return (
        <div>
        <MyTreeItem id="1" name="Applications" />
            <MUIDataTable
        data={orgRoleData.orgRoles}
        columns={columns}
        options={options}
      />
            <RadioButtons selectedRole={setUserRole} roleList={orgRoleData.orgRoles}/>
            <UserCreateDialog createDataHandler={userCreateDataHandler } 
            title="USER MANGEMENT" type ="USER" subtitle="USER CREATE" label1="FirstName" label2="LastName" label3="EMAIL"/>
        </div>
    )
}
