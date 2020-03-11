import React,{useState} from 'react'
import { format } from "date-fns";
import { Row,Col, Card,CardHeader,CardBody,CardFooter
} from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {GET_ORGS} from '../queries/getAllOrgs'
import MUIDataTable from "mui-datatables"; 
import CreateDataDialog from "./CreateDataDialog"
import{CREATE_ORG,DELETE_ORG} from '../mutations/org.js'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import SubOrgManagement from './SubOrgManagement'
import GroupManagement from './GroupManagement'
import SubGroupManagement from "./SubGroupManagement"
const TestApp = () => {
  const [orgCreate] = useMutation(CREATE_ORG);
  const [deleteOrg]=useMutation(DELETE_ORG); 
  const [rowSel,setRowSel]=useState({})
  const [selectedRowData,setSelectedRowData] =useState(null);
  const [selectedSubOrgRowData,setSelectedSubOrgRowData]=useState(null);
  const [groupRowData,setGroupRowData] = useState(null);
  const { loading:orgLoading, error:orgError, data:orgData } = useQuery(GET_ORGS)

  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {return <div>ORG Loading</div>;}
  console.log("orgData",orgData, " rowSel ",rowSel)
  const columns = [
    {name:"id",
    options: {
          display: false,
        }

    },
    "name", "description","updatedAt",{
          
          name: "createdAt",
               options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div>
              {format(new Date(value), "dd/MM/yy hh:mm:ss")}
            
           </div>
          )
        }
        }];
  const options={
    selectableRows: 'single',
    rowsSelected:rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
        console.log("Row Selected",rowsSelected,"ALL ROWSS", allRows);
        setRowSel({ rowsSelected: allRows.map(row => row.dataIndex) });
      },
    onRowClick:(rowData, rowMeta)=>{
      console.log("Clicked rowData",rowData)
      setSelectedRowData(rowData)
    },
    onRowsDelete: (rowsDeleted) => {
        
        console.log(rowsDeleted.data[0].index, "were deleted!", " and value", orgData.allorgs[rowsDeleted.data[0].index]);
            deleteOrg({
      variables: { id: orgData.allorgs[rowsDeleted.data[0].index].id},
      refetchQueries: [{ query: GET_ORGS }]
    }).then(res => {
        console.log("ORG  DeleteResponse", res);
        setRowSel({})
      })
      .catch(err => {
                throw new Error("Error in Deleting",err);

      })
  },
  }
  const addOrgHandler = (data)=>{
    console.log("DATA FOR ORG CREATION",data)
       orgCreate({ variables: { name:data.name,description:data.description },refetchQueries: [{ query: GET_ORGS }]  }).then((res)=>{
            console.log("ORG CREATION DATA using Dialog",res)
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
         <CreateDataDialog  createDataHandler={addOrgHandler} type="ORG" title="Organization" subtitle="Add Org" label1="ORGNIZATION Name" label2="Detail"/>
     
      </CardHeader>
      <MUIDataTable
  data={orgData.allorgs}
  columns={columns}
  options={options}
  />
</Card>
</Col>
<Col>
   {selectedRowData?<Card small className="blog-comments"><SubOrgManagement  id={selectedRowData[0]} subOrgRowSelectedData={setSelectedSubOrgRowData} />
      
    </Card>:""}
    </Col>
     </Row>
     <Row>
      <Col>
   {selectedSubOrgRowData?<Card small className="blog-comments"><GroupManagement  id={selectedSubOrgRowData[0]} groupRowSelectedData={setGroupRowData}/>
      
    </Card>:""}
    </Col>
    <Col>
     {groupRowData?<Card small className="blog-comments"><SubGroupManagement  id={groupRowData[0]} />
      
    </Card>:""}

     </Col>
     </Row>
    </div>
  )
}

export default TestApp
