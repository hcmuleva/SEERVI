import React,{useState,useEffect} from 'react'
import { format } from "date-fns";
import { Row,Col, Card,CardHeader,CardBody,CardFooter
} from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline'
import {GET_SUBORGS} from '../queries/getAllOrgs'
import MUIDataTable from "mui-datatables"; 
import CreateDataDialog from "./CreateDataDialog"
import{CREATE_SUBORG,DELETE_SUBORG,CREATE_SUBORGROLE} from '../mutations/org.js'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import RoleDataDialog from "./RoleDataDialog"
const SubOrgManagement = (props) => {
  let orgid=props.id
  const createSubOrgRole = useMutation(CREATE_SUBORGROLE);
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
  console.log("\n****SUBORG DATA ",suborgData, " \n*****\n")
  console.log("PROPS OF SUBORGMANAGEMENT",props)
  const columns = [   
     {name:"suborgRoles",options: {display: false}},
    {name:"id",
    options: {
          display: false,
        }

    },
    "name", "description", 
    // {
    //     name: "SubOrgRole",
    //     options: {
    //       filter: false,
    //       sort: false,
    //       empty: true,
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <button onClick={() => {
    //            console.log("SubOrgRoleCreate Button Clicked ")
    //           }}>
    //             SubOrgRole
    //           </button>
    //         );
    //       }
    //     }
    //   }
      ];
  const options={
    selectableRows: 'single',
    rowsSelected:rowSel.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
        setRowSel({ rowsSelected: allRows.map(row => row.dataIndex) });
      },
    onRowClick:(rowData, rowMeta)=>{
      console.log("ROW DATA OF SUBORG =>",rowData)
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
const addSubOrgRoleHandler = (data)=>{
  console.log("Data ==>",data , "Selected ORG ",selectedRowData )
   createSubOrgRole({ variables: { name:data.name,description:data.description, suborg: props.id}  }).then((res)=>{
            console.log("SubOrgRole CREATION DATA using Dialog",res.data.createSubOrgRole)
        }).catch(err=>{
            throw new Error("Error in creating Suborg Role")
        })
}
  return (
    <div>
      <Row>
        <Col lg="1">
      <CreateDataDialog  createDataHandler={addSubOrgHandler} type="SUBORG" title="SubOrg" subtitle="Add SubOrg" label1="SubOrg Name" label2="Descriiption"/>
      </Col>
      <Col lg="1">
         
        {selectedRowData?<RoleDataDialog  createRoleDataHandler={addSubOrgRoleHandler} type="SUBORG" 
        roledata={selectedRowData[0]}
        rolecolumns={[{name:"id",
    options: {
          display: false,
        }

    },"name"]}
        title="SUBOrg" subtitle="Add SubOrg"
         label1="SubOrg Name" label2="Detail"
        />:""}
        
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
