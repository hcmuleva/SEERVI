import React,{useState} from 'react'
import { format } from "date-fns";
import { Row,Col, Card,CardHeader,CardBody,CardFooter
} from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {GET_ALLSTD} from './query/stdquery'
import MUIDataTable from "mui-datatables"; 
import{CREATE_STD} from './mutation/stdmutation.js'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import CreateStdDataDialog from "./CreateStdDataDialog"

const AddStd = (props) => {
  const [createStd] = useMutation(CREATE_STD);
  const [rowSel,setRowSel]=useState({})
  const [selectedRowData,setSelectedRowData] =useState(null);
  const { loading:stdLoading, error:stdError, data:stdData } = useQuery(GET_ALLSTD)

  if (stdError) return <p>Education Std ERROR: {stdError.message}</p>;
  if (stdData === undefined) return <p>Education ERROR</p>;
  if (stdLoading) {return <div>Education Loading</div>;}
  console.log("stdData",stdData, " rowSel ",rowSel)
  const columns = [
    {name:"id",options: {display: false}},
   "stdname", "year", "branch","category",
   
       
        ];
  const options={
    selectableRows: 'single',
    rowsSelected:rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
        setRowSel({ rowsSelected: allRows.map(row => {
          console.log("row.dataIndex", row.dataIndex)
          console.log("row.dataIndexRow Data",stdData.getAllStd[row.dataIndex])
          
          return row.dataIndex
          }) });
          console.log("stdData.allstds[rowSel] ",stdData.getAllStd[rowSel])
           setSelectedRowData(stdData.getAllStd[rowSel])
            console.log("BEFORE APPSDATASET",stdData.getAllStd[rowsSelected[0].index])
           if(props){
             props.selectStdRow(stdData.getAllStd[rowsSelected[0].index])
           }
      },
    onRowClick:(rowData, rowMeta)=>{
      console.log("Clicked rowData",rowData)

      setSelectedRowData(rowData)
    },
    onRowsDelete: (rowsDeleted) => {
        
    //     console.log(rowsDeleted.data[0].index, "were deleted!", " and value", stdData.allstds[rowsDeleted.data[0].index]);
    //         deleteOrg({
    //   variables: { id: stdData.allstds[rowsDeleted.data[0].index].id},
    //   refetchQueries: [{ query: GET_ORGS }]
    // }).then(res => {
    //     console.log("ORG  DeleteResponse", res);
    //     setRowSel({})
    //   })
    //   .catch(err => {
    //             throw new Error("Error in Deleting",err);

    //   })
  },
  }
  const addOrgHandler = (data)=>{
       createStd({ variables: { stdname:data.stdname,branch:data.branch,year:data.year,category:data.category },refetchQueries: [{ query: GET_ALLSTD }]  }).then((res)=>{
            console.log("Education StdData CREATION DATA using Dialog",res)
        }).catch(err=>{
            throw new Error("Error in creating Org")
        })
  }

  return (
    <div>
   
     <Row>
     <Col>
      <Card small className="blog-comments">
      <CardHeader>
       <Row>
      <Col lg="1" md="1">
         <CreateStdDataDialog  createDataHandler={addOrgHandler} type="STD" title="Education Std" subtitle="Add Std" label1="YourClass" label2="branch" label3="year" label4="category"/>
      </Col>
      
        </Row>
      </CardHeader>
     
      <MUIDataTable
  data={stdData.getAllStd}
  columns={columns}
  options={options}
  />
  
</Card>
</Col>

     </Row>
    </div>
  )
}

export default AddStd
