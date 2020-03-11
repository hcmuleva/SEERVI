import React,{useState,useEffect} from 'react'
import { format } from "date-fns";
import { Row,Col, Card,CardHeader,CardBody,CardFooter
} from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {GET_GROUPSOFSUBORG} from '../queries/getAllOrgs'
import MUIDataTable from "mui-datatables"; 
import CreateDataDialog from "./CreateDataDialog"
import{CREATE_GROUP,DELETE_GROUP} from '../mutations/org.js'
import { useQuery ,useMutation} from '@apollo/react-hooks';

const GroupManagement = (props) => {
console.log("GROUP MANAGEMENT PROPS ",props)
  const [groupCreate] = useMutation(CREATE_GROUP);
  const [deleteGroup]=useMutation(DELETE_GROUP); 
  const [rowSel,setRowSel]=useState({})
  const [selectedRowData,setSelectedRowData] =useState(null);
 const { loading: groupLoading, error: groupError, data: groupData ,refetch} = useQuery(
    GET_GROUPSOFSUBORG,{variables:{id:props.id}}
  );  
  if (groupError) return <p>Group ERROR: {groupError.message}</p>;
  if (groupData === undefined) return <p>Group ERROR</p>;
  if (groupLoading) {
    return <div>Group Loading</div>;
  }
 
  const columns = [ {name:"id",
    options: {
          display: true,
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
      props.groupRowSelectedData(rowData)
    },
    onRowsDelete: (rowsDeleted) => {
        
            deleteGroup({
      variables: { id: groupData.groupsOfSubOrg[rowsDeleted.data[0].index].id},
      refetchQueries: [{ query: GET_GROUPSOFSUBORG,variables: { id: props.id } }]
    }).then(res => {
        console.log("Group  DeleteResponse", res);
        setRowSel({})
      })
      .catch(err => {
                throw new Error("Error in Deleting",err);

      })
  },
  }
  const addGroupHandler = (data)=>{
    console.log("Group Create time Suborg id passed ", props.id)
       groupCreate({ variables: {  name:data.name,description:data.description, suborgid: props.id },refetchQueries: [{ query: GET_GROUPSOFSUBORG,variables: { id: props.id } }]  }).then((res)=>{
            console.log("Group CREATION DATA using Dialog",res)
        }).catch(err=>{
            throw new Error("Error in creating Group",err)
        })
  }

  return (
    <div>
      <Row>
        <Col lg="1">
      <CreateDataDialog  createDataHandler={addGroupHandler} type="GROUP" title="Group" subtitle="Add Group" label1="Group Name" label2="Group Description"/>
      </Col>
      </Row>
      <Card small className="blog-comments">
      <MUIDataTable

  data={groupData.groupsOfSubOrg}
  columns={columns}
  options={options}
  
/>
</Card>
    </div>
  )
}

export default GroupManagement
