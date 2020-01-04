import React from 'react'
import SidebarActions from './SidebarActions'
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import SidebarCategories from './SidebarCategories'
import Org from './org/Org'
export default function Admin() {
    return (
        
        <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
    </Row>
    
    <Row> 
      <Col lg="1" md="12">
      
      </Col>
      <Col lg="11" md="12">
      <Org/>
      </Col>
     
    </Row>
  </Container>
           
    )
}
