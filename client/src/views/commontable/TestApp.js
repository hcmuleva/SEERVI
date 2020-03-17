import React,{useState} from 'react'
import { format } from "date-fns";
import { Row,Col, Card,CardHeader,CardBody,CardFooter
} from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {GET_ORGS} from '../queries/getAllOrgs'
import MUIDataTable from "mui-datatables"; 
import CreateDataDialog from "./CreateDataDialog"
import{CREATE_ORG,DELETE_ORG,CREATE_ORGROLE} from '../mutations/org.js'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import SubOrgManagement from './SubOrgManagement'
import GroupManagement from './GroupManagement'
import SubGroupManagement from "./SubGroupManagement"
import RoleDataDialog from "./RoleDataDialog"
const TestApp = () => {
  const [orgCreate] = useMutation(CREATE_ORG);
  const [createOrgRole]=useMutation(CREATE_ORGROLE)
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
    {name:"id",options: {display: false}},
    {name:"orgRoles",options: {display: false}},
    "name", "description",
    {name: "createdAt",options: {filter: false,customBodyRender: (value, tableMeta, updateValue) => 
      (<div>{format(new Date(value), "dd/MM/yy hh:mm:ss")} </div>
      )}},
       
        ];
  const options={
    selectableRows: 'single',
    rowsSelected:rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
        setRowSel({ rowsSelected: allRows.map(row => {
          console.log("row.dataIndex", row.dataIndex)
          console.log("row.dataIndexRow Data",orgData.allorgs[row.dataIndex])
          
          return row.dataIndex
          }) });
          console.log("orgData.allorgs[rowSel] ",orgData.allorgs[rowSel])
           setSelectedRowData(orgData.allorgs[rowSel])
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
const addRoleHandler = (data)=>{
  console.log("Data ==>",data , "Selected ORG ",selectedRowData[0] )
   createOrgRole({ variables: { name:data.name,description:data.description, org: selectedRowData[0]}  }).then((res)=>{
            console.log("Role CREATION DATA using Dialog",res.data.createOrgRole)
            console.log("selectedRowData second element ",selectedRowData[1])
        }).catch(err=>{
            throw new Error("Error in creating Role")
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
         <CreateDataDialog  createDataHandler={addOrgHandler} type="ORG" title="Organization" subtitle="Add Org" label1="ORGNIZATION Name" label2="Detail"/>
      </Col>
      <Col lg="1" md="1">
        {selectedRowData?<RoleDataDialog  createRoleDataHandler={addRoleHandler} type="ORG" 
        roledata={selectedRowData[1]}
        rolecolumns={[{name:"id",
    options: {
          display: false,
        }

    },"name"]}
        title="Organization" subtitle="Add OrgRole"
         label1="Org Role Name" label2="Detail"
        />:""}
        </Col>
        </Row>
      </CardHeader>
     
      <MUIDataTable
  data={orgData.allorgs}
  columns={columns}
  options={options}
  />
  
</Card>
</Col>
 <Col >
   {selectedRowData?
   <Card small className="blog-comments">
        <Col >
        {selectedRowData?<RoleDataDialog  createRoleDataHandler={addRoleHandler} type="SUBORG" 
        roledata={selectedRowData[1]}
        rolecolumns={[{name:"id",
    options: {
          display: false,
        }

    },"name"]}
        title="SUBOrg" subtitle="Add SubOrg"
         label1="SubOrg Name" label2="Detail"
        />:""}
        </Col>
   <SubOrgManagement  id={selectedRowData[0]} subOrgRowSelectedData={setSelectedSubOrgRowData}
    />
       
    </Card>:""}
    </Col>

     </Row>
     <Row>
      <Col>
   {selectedSubOrgRowData?<Card small className="blog-comments"><GroupManagement  id={selectedSubOrgRowData[0]} groupRowSelectedData={setGroupRowData}/>
      
    </Card>:""}
    </Col>
    <Col>
     {groupRowData?
     <Card small className="blog-comments"><SubGroupManagement  id={groupRowData[0]} 
     />
      
    </Card>:""}

     </Col>
     </Row>
    </div>
  )
}

export default TestApp
