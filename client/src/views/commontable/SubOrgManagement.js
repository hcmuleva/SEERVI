import React,{useState,useEffect} from 'react'
import { format } from "date-fns";
import { Row,Col, Card,CardHeader,CardBody,CardFooter
} from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {GET_SUBORGS} from '../queries/getAllOrgs'
import MUIDataTable from "mui-datatables"; 
import CreateDataDialog from "./CreateDataDialog"
import{CREATE_SUBORG,DELETE_SUBORG} from '../mutations/org.js'
import { useQuery ,useMutation} from '@apollo/react-hooks';

const SubOrgManagement = (props) => {
  let orgid=props.id

  const [suborgCreate] = useMutation(CREATE_SUBORG);
  const [deletesubOrg]=useMutation(DELETE_SUBORG); 
  const [rowSel,setRowSel]=useState({})
  const [selectedRowData,setSelectedRowData] =useState(null);
 const { loading: suborgLoading, error: suborgError, data: suborgData ,refetch} = useQuery(
    GET_SUBORGS,{variables:{id:orgid}}
  );  
  if (suborgError) return <p>SubOrg ERROR: {suborgError.message}</p>;
  if (suborgData === undefined) return <p>ERROR</p>;
  if (suborgLoading) {
    return <div>SUBORG Loading</div>;
  }
 
  console.log("PROPS OF SUBORGMANAGEMENT",props)
  const columns = [   {name:"id",
    options: {
          display: false,
        }

    },"name", "description","updatedAt"];
  const options={
    selectableRows: 'single',
    rowsSelected:rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
        setRowSel({ rowsSelected: allRows.map(row => row.dataIndex) });
      },
    onRowClick:(rowData, rowMeta)=>{
      setSelectedRowData(rowData)
      props.subOrgRowSelectedData(rowData)

    },
    onRowsDelete: (rowsDeleted) => {
        
        console.log(rowsDeleted.data[0].index, "were deleted!", " and value", suborgData.suborgsoforg[rowsDeleted.data[0].index]);
            deletesubOrg({
      variables: { id: suborgData.suborgsoforg[rowsDeleted.data[0].index].id},
      refetchQueries: [{ query: GET_SUBORGS,variables: { id: props.id } }]
    }).then(res => {
        console.log("ORG  DeleteResponse", res);
        setRowSel({})
      })
      .catch(err => {
                throw new Error("Error in Deleting",err);

      })
  },
  }
  const addSubOrgHandler = (data)=>{
    console.log("DATA FOR ORG CREATION",data, " and org is ", props.id)
       suborgCreate({ variables: {  name:data.name,description:data.description, org: props.id },refetchQueries: [{ query: GET_SUBORGS,variables: { id: props.id } }]  }).then((res)=>{
            console.log("SubORG CREATION DATA using Dialog",res)
        }).catch(err=>{
            throw new Error("Error in creating Org",err)
        })
  }

  return (
    <div>
      <Row>
        <Col lg="1">
      <CreateDataDialog  createDataHandler={addSubOrgHandler} type="SUBORG" title="SubOrg" subtitle="Add SubOrg" label1="SubOrg Name" label2="Descriiption"/>
      </Col>
      </Row>
      <Card small className="blog-comments">
      <MUIDataTable

  data={suborgData.suborgsoforg}
  columns={columns}
  options={options}
  
/>
</Card>
    </div>
  )
}

export default SubOrgManagement
