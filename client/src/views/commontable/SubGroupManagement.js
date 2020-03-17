import React,{useState,useEffect} from 'react'
import { format } from "date-fns";
import { Row,Col, Card,CardHeader,CardBody,CardFooter
} from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {GET_SUBGROUPSOFGROUP} from '../queries/getAllOrgs'
import MUIDataTable from "mui-datatables"; 
import CreateDataDialog from "./CreateDataDialog"
import{CREATE_SUBGROUP,DELETE_SUBGROUP} from '../mutations/org.js'
import { useQuery ,useMutation} from '@apollo/react-hooks';

const SubGroupManagement = (props) => {
console.log("SUBGROUP MANAGEMENT PROPS ",props)
  const [subgroupCreate] = useMutation(CREATE_SUBGROUP);
  const [deleteSubGroup]=useMutation(DELETE_SUBGROUP); 
  const [rowSel,setRowSel]=useState({})
  const [selectedRowData,setSelectedRowData] =useState(null);
 const { loading: subgroupLoading, error: subgroupError, data: subgroupData ,refetch} = useQuery(
    GET_SUBGROUPSOFGROUP,{variables:{id:props.id}}
  );  
  if (subgroupError) return <p>SubGroup ERROR: {subgroupError.message}</p>;
  if (subgroupData === undefined) return <p>SubGroup ERROR</p>;
  if (subgroupLoading) {
    return <div>SubGroup Loading</div>;
  }
  console.log("subgroupData",subgroupData)
  const columns = ["name", "description",{
        name: "SubGroupRole",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={() => {
               console.log("SubGroupRoleCreate Button Clicked ")
              }}>
                SubGroupRole
              </button>
            );
          }
        }
      },];
  const options={
    selectableRows: 'single',
    rowsSelected:rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
        setRowSel({ rowsSelected: allRows.map(row => row.dataIndex) });
      },
    onRowClick:(rowData, rowMeta)=>{
      setSelectedRowData(rowData)
    },
    onRowsDelete: (rowsDeleted) => {
        
            deleteSubGroup({
      variables: { id: subgroupData.subgroupsOfGroup[rowsDeleted.data[0].index].id},
      refetchQueries: [{ query: GET_SUBGROUPSOFGROUP,variables: { id: props.id } }]
    }).then(res => {
        console.log("SubGroup   DeleteResponse", res);
        setRowSel({})
      })
      .catch(err => {
                throw new Error("Error in Deleting",err);

      })
  },
  }
  const addSubGroupHandler = (data)=>{
    console.log("SubGroup Create time Suborg id passed ", props.id)
       subgroupCreate({ variables: {  name:data.name,description:data.description, groupid: props.id },refetchQueries: [{ query: GET_SUBGROUPSOFGROUP,variables: { id: props.id } }]  }).then((res)=>{
            console.log("SubGroup CREATION DATA using Dialog",res)
        }).catch(err=>{
            throw new Error("Error in creating SubGroup",err)
        })
  }

  return (
    <div>
      <Row>
        <Col lg="1">
      <CreateDataDialog  createDataHandler={addSubGroupHandler} type="SUBGROUP" title="SubGroup" subtitle="Add SubGroup" label1="SubGroup Name" label2="SubGroup Description"/>
      </Col>
      </Row>
      <Card small className="blog-comments">
      <MUIDataTable

  data={subgroupData.subgroupsOfGroup}
  columns={columns}
  options={options}
  
/>
</Card>
    </div>
  )
}

export default SubGroupManagement
