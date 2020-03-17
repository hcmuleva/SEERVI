import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "shards-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_ALLSUBJECTS } from "./query/SubjectQuery";
import MediumSelector from "./MediumSelector"
import {
  CREATE_SUBJECT,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
} from "./mutation/SubjectMutation";
import MUIDataTable from "mui-datatables";
import AddStd from "./addStd"
import CreateSubjectDialog from "./CreateSubjectDialog"
export default function SubjectAdder() {
  const [rowSel, setRowSel] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedMedium,setSelectedMedium] = useState(null);
  const [isStdDisplay,setIsStdDisplay]=useState(false)
  const [isMediumDisplay,setIsMediumDisplay]=useState(false)

  const [stdSelected,setStdSelected] = useState(null)
  const {
    loading: subjectLoading,
    error: subjectError,
    data: subjectData
  } = useQuery(GET_ALLSUBJECTS);
  if (subjectError) return <p>Subject ERROR: {subjectError.message}</p>;
  if (subjectData === undefined) return <p>Subject ERROR</p>;
  if (subjectLoading) {
    return <div>SUBject Loading</div>;
  }
  
  /**
        in this we need to column. 
        1. It will shows std and wil
        2. List of Subject of Given Medium and Std. 
        when std select then it will start showing all the subjects.
     */
  const columns = [
    { name: "id", options: { display: false } },
    "name",
    "board",
    "category",
    { name: "medium.id", options: { display: false } },
    { name: "medium.name", label: "Medium", options: { display: true } },
    { name: "std.id", options: { display: false } },
    { name: "std.stdname", label: "Std", options: { display: true } },
    { name: "group.id", options: { display: false } },
    { name: "group.name", label: "Group", options: { display: true } },
    { name: "subgroup.id", options: { display: false } },
    { name: "subgroup.name", label: "SubGroup", options: { display: true } }
  ];
  const options = {
    selectableRows: "single",
    rowsSelected: rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      setRowSel({ rowsSelected: allRows.map(row => row.dataIndex) });
    },
    onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF SUBORG =>", rowData);
      setSelectedRowData(rowData);
    },
    onRowsDelete: rowsDeleted => {
      console.log(
        rowsDeleted.data[0].index,
        "were deleted!",
        " and value",
        subjectData.subjectsoforg[rowsDeleted.data[0].index]
      );
      //         deletesubOrg({
      //   variables: { id: subjectData.subjectsoforg[rowsDeleted.data[0].index].id},
      //   refetchQueries: [{ query: GET_SUBORGS,variables: { id: props.id } }]
      // }).then(res => {
      //     console.log("ORG  DeleteResponse", res);
      //     setRowSel({})
      //   })
      //   .catch(err => {
      //             throw new Error("Error in Deleting",err);

      //   })
    }
  };

  const addSubjectHandler = data => {
    console.log("Subject create ");
    // subgroupCreate({
    //   variables: {
    //     name: data.name,
    //     description: data.description,
    //     groupid: props.id
    //   },
    //   refetchQueries: [
    //     { query: GET_SUBGROUPSOFGROUP, variables: { id: props.id } }
    //   ]
    // })
    //   .then(res => {
    //     console.log("SubGroup CREATION DATA using Dialog", res);
    //   })
    //   .catch(err => {
    //     throw new Error("Error in creating SubGroup", err);
    //   });
  };
  const stdSelection=(data)=>{
      setStdSelected(data)
      console.log("DATA",data)
      data?setIsStdDisplay(false):setIsStdDisplay(true)
      console.log("DATA SELECTED ",data)
  }
  const mediumHandler=(data)=>{
    setSelectedMedium(data)
    data?setIsMediumDisplay(false):setIsMediumDisplay(true)
  }
  const subjectHandler = (data)=>{
    console.log("Data for Subject Creation",data);
  }
  return (
    <div>
        
         {isMediumDisplay?<MediumSelector mediumSelectHandler={mediumHandler}/>:<button onClick={()=>{
            setIsMediumDisplay(true)
            }}>SelectMedium</button>}
        {isStdDisplay?<AddStd selectStdRow={stdSelection}/>:<button onClick={()=>{
            setIsStdDisplay(true)
            }}>SelectStd</button>}
        {selectedMedium && stdSelected?
          <CreateSubjectDialog 
            type="SUBJECT"
            title="Subject"
            subtitle="Create Subject"
            label1="SubjectName"
            label2="board"
            label3="category"
            label4="group"
            label5="subgroup"
            label6="medium"
            label7="std"
            createDataHandler={subjectHandler}

            />
          :""}
      <MUIDataTable
        data={subjectData.getAllSubjects}
        columns={columns}
        options={options}
      />
    </div>
  );
}
