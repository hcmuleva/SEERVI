import React from 'react'
import MUIDataTable from "mui-datatables";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALLSTD } from "../../../../graphql/queries/education/std";
import {GET_ALLMEDIUM} from "../../../../graphql/queries/education/medium"
import { Container, Row, Col } from "shards-react";
export default function gradetable() {
      const [gradeSelected, setGradeSelected] = useState({});
  const [gradeRows, setGradeRows] = useState(null);
   
  const {
    loading: gradeLoading,
    error: gradeError,
    data: gradeData,
  } = useQuery(GET_ALLSTD);
   if (gradeError) return <p>ERROR: {gradeError.message}</p>;
  if (gradeData === undefined)
    return <p>ERROR in GETTing sgrade BY ID</p>;
  if (gradeLoading) {
    return <div>grade Loading</div>;
  }
 
  console.log("grade", gradeData.getAllStd);
  const gradecolumns = [
    {
      name: "gradename",
      label: "GRADES",
    },
    {
      name: "category",
      label: "CATEGORY",
    },
    {
      name: "branch",
      label: "BRANCH",
    },
    {
      name: "specilize",
      label: "SPECIALIZATION",
    },
    { name: "semester", label: "SEMESTER" },
    {
      name: "year",
      label: "YEAR",
    },
    {
      name: "isPublished",
      label: "IsPublished",
    },
  ];
  const gradeoptions = {
    print: false,
    download: false,
    selectableRows: "none",
    rowsSelected: gradeSelected.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      setGradeSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      console.log("ALLROWS ", gradeSelected);
      setGradeRows(allRows);
      console.log("gradeRows",gradeRows)
    },
  };
    return (
        <div>
            
        </div>
    )
}
