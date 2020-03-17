  import React ,{useState} from 'react'
  import {GET_ALLMEDIUM} from "./query/mediumQuery"
import { useQuery, useMutation } from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";

  export default function MediumSelector(props) {
     const [rowSel, setRowSel] = useState({});
    const [selectedRowData, setSelectedRowData] = useState(null);
 const {
    loading: mediumLoading,
    error: mediumError,
    data: mediumData
  } = useQuery(GET_ALLMEDIUM);
  if (mediumError) return <p>MEDIUM ERROR: {mediumError.message}</p>;
  if (mediumData === undefined) return <p>MEDIUM ERROR</p>;
  if (mediumLoading) {
    return <div>MEDIUM Loading</div>;
  }
  console.log("MEDIUM Data ==> ", mediumData);
  const columns=[
    "id","name"
  ]
  const options = {
    selectableRows: "single",
    rowsSelected: rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      console.log("allRows.map(row => row.dataIndex)",allRows.map(row => row.dataIndex));
      console.log("selected Row value ",mediumData.getAllMedium[allRows.map(row => row.dataIndex)])
      props.mediumSelectHandler(mediumData.getAllMedium[allRows.map(row => row.dataIndex)])
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
  return ( <MUIDataTable
        data={mediumData.getAllMedium}
        columns={columns}
        options={options}
      />)
      
  }
  