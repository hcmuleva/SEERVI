import React , { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {GET_ALLMEDIUM} from "../../../../graphql/queries/education/medium"
import { Container, Row, Col } from "shards-react";

export default function Mediumtable(props) {
  console.log("hcm",props.hcm)
  const [medeiumSelected, setMedeiumSelected] = useState({});
  const [mediumRows, setMediumRows] = useState(null);
  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    { name: "name",label:"Medium"}
  ]

    const medoptions = {
       filter: true,
      selectableRows: 'none',
      selectableRowsOnClick: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsSelected: medeiumSelected.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      console.log("ROW SELECTED in medium",allRows)
      setMedeiumSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      setMediumRows(allRows);
      console.log("mediumRows",mediumRows)
    },
  };
        const {
    loading: mediumLoading,
    error: mediumError,
    data: mediumData,
  } = useQuery(GET_ALLMEDIUM);
   if (mediumError) return <p>ERROR: {mediumError.message}</p>;
  if (mediumData === undefined)
    return <p>ERROR in GETTing medium BY ID</p>;
  if (mediumLoading) {
    return <div>medium Loading</div>;
  }
  console.log("mediumData ",mediumData)
    

    return (
      <div>
         <MUIDataTable
        title="Medium"
    
        option={medoptions}
        columns={columns}
            data={mediumData.getAllMedium}
      /> 
      </div>
    )
}
