import React,{useState,useEffect} from 'react'
import { useQuery ,useMutation} from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";

import { GET_ALLORGS_ALLROLES } from "../../../graphql/queries/roles/roles";
import {DELETE_ROLE} from "../../../graphql/mutations/roles/rolemgmt"


import { Container, Row, Col } from "shards-react";


import PageTitle from "../../../components/common/PageTitle";
import SidebarCategories from "../../../components/add-new-post/SidebarCategories";
import Addorg from "./addorgrole"
import RoleTableView from "./roletableview"
export default function rolemgmt() {
  const [tbd,setTbd] = useState(null);
  const { loading: orgroleLoading, error: orgroleError, data: orgroleData } = useQuery(
    GET_ALLORGS_ALLROLES
  );
  if (orgroleError) return <p>role ERROR: {orgroleError.message}</p>;
  if (orgroleData === undefined) return <p>ERROR</p>;
  if (orgroleLoading) {
    return <div>role Loading</div>;
  }
  const [selectedOrg,setSelectedOrg] =useState(null)
   const columns = [
    {
      name: "id",
      options: {
        display: false
      }
    },
    "name",
    "description",
    {
      name: "orgRoles",
      options: {
        display: false
      }
    },
    
    
    
  ];
 
    
     const options = {
    selectableRows: "none",
    print: false,
    download:false,
    filter: true,
    filterType: "textField",
    elevation: 2,
    rowsPerPage: 5,
     rowsPerPageOptions: [5, 10, 15, 20],
    onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF SUBORG =>",rowData, rowData[3], "row meta ",rowMeta);
      setSelectedOrg(rowData)
      console.log("selectedOrg",selectedOrg)
    },
   
  }
    
    useEffect(() => {
    console.log("RowData",selectedOrg)
    if(selectedOrg) console.log("ROLE DATA ",selectedOrg[3])
}, [selectedOrg]);
    return (
        <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title={selectedOrg?selectedOrg[1]:"Select ORG"} subtitle="View" className="text-sm-left" />
    </Row>
    <Row>
        
        {selectedOrg?<Addorg orgid={selectedOrg[0]}/>:"Select ORG"}
    </Row>
    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
         <MUIDataTable
        data={orgroleData.allorgs}
        columns={columns}
        options={options}
      />
      </Col>

      {/* Sidebar Widgets */}
      <Col lg="3" md="12">
       {selectedOrg?<RoleTableView roles={selectedOrg[3]} roleSelected={setTbd}/>:"" } 
        <h1>Role::{tbd}</h1>
        <SidebarCategories />
      </Col>
    </Row>
  </Container>
    )
}
