import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALLSTD } from "../../../../graphql/queries/education/std";
import {GET_ALLMEDIUM} from "../../../../graphql/queries/education/medium"
import { Container, Row, Col } from "shards-react";
import Chip from "@material-ui/core/Chip";
import CreateSubjectDialog from "./addSubjectDialog"
export default function Subject() {
   const [gradeSelected, setGradeSelected] = useState({});
  const [gradeRows, setGradeRows] = useState(null);
      const [medeiumSelected, setMedeiumSelected] = useState({});
  const [mediumRows, setMediumRows] = useState(null);
  console.log("mediumRows==> ",mediumRows)
    console.log("gradeRows==> ",gradeRows)

  const gradecolumns = [
      {
      name: "id",
      options: {
        display: false,
      },
    },
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
    selectableRows: "single",
    rowsSelected: gradeSelected.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      setGradeSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      console.log("ALLROWS ", gradeSelected);
      setGradeRows(allRows);
      console.log("gradeRows",gradeRows)
    },
  };

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
       print:false,
       download:false,
       filter:false,
       selectableRows: "single",
     onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF SUBORG =>", rowData);
    },
      rowsSelected: medeiumSelected.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      console.log("ROW SELECTED in medium",allRows)
      setMedeiumSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      setMediumRows(allRows);
      console.log("mediumRows",mediumRows,"rowsSelected ",rowsSelected, "medeiumSelected",medeiumSelected)
    },
  };
  const {
    loading: mediumLoading,
    error: mediumError,
    data: mediumData,
  } = useQuery(GET_ALLMEDIUM);
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
  if(mediumError){
    return <div><p>Error in Medium</p></div>
  }else if(mediumLoading){
    return <div><p>Loading in Medium</p></div>
  }else if(mediumData===undefined){return <div><p> Medium Error undefiined</p></div>}
  
  console.log("gradeData ==>",gradeData)
  
  return (
   <div>
      <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}

    <Row noGutters className="page-header py-4">
      <Col lg="1" md="1" sm="1"> 
      {
      gradeRows&&gradeRows.length>0?
    gradeRows.map((grade)=>{
       return <Chip label={gradeData.getAllStd[grade.index].gradename} key={gradeData.getAllStd[grade.index].id} />
      
    })
  :""
        
      }
      </Col>
       <Col lg="1" md="1" sm="1">
       
      {
      mediumRows&&mediumRows.length>0?
    mediumRows.map((med)=>{
       
       return <Chip color="primary" label={mediumData.getAllMedium[med.index].name} key={mediumData.getAllMedium[med.index].id} />
      
    })
  :""
        
      }
       </Col>
       <Col lg="1" md="1" sm="1">
        {
          
          gradeRows&&mediumRows&&gradeRows.length>0 &&mediumRows.length>0?<CreateSubjectDialog subgroup={localStorage.getItem("subgroupid")} std={gradeData.getAllStd[gradeRows[0].index].id} medium={mediumData.getAllMedium[mediumRows[0].index].id}/>:""}
       </Col>
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
       
     <MUIDataTable
        title="GRADES"
        data={gradeData.getAllStd}
        columns={gradecolumns}
        options={gradeoptions}
      />  
         </Col>

      {/* Sidebar Widgets */}
      <Col lg="3" md="12">
       <MUIDataTable
        title="MEDIUM"
        data={mediumData.getAllMedium}
        columns={columns}
        options={medoptions}
      /> 
      </Col>
    </Row>
  </Container></div>
   
  );
}
