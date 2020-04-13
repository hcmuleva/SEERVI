import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'

import { useQuery ,useMutation} from "@apollo/react-hooks";
import {DELETE_ORG} from "../../../graphql/mutations/administration/org/orgmgmt"
import { GET_ORGS } from "../../../graphql/queries/administration/org";
import Addorg from "./addorg"
import Editorg from "./editorg"
import Orgtableview from "./orgtableview"
export default function Orgmgmt(props) {
   
  const [comptype, setComptype] = useState(null);
  const [rowData, setRowData] = useState(null);
  
  const [isEdit,setIsEdit]= useState(false)
  const handleEditData =(data)=>{
    console.log("Data ",data)
    //setRowData(rowData)
  }
  const handleClickAddd=()=>{
    setComptype("ADDORG")
  }
  const handleEdit =()=>{
    setIsEdit(true)
  }
  return (
    <div>
      
   
     {isEdit?<Editorg editHandler={handleEdit} data={rowData}/>:<Addorg/>  }
     <Orgtableview editHandler={handleEdit} editData={handleEditData} />
      
    </div>
  );
}
