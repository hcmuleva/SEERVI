import React, { useState }from 'react'
import { Row, Col, Button } from "shards-react";
import User from '../user/User'
import OrgMgmt from './OrgMgmt'
export default function Org() {
    const [actionType,setActionType]=useState('')
    const handleOrg=(event)=>{
        setActionType('org')
    }
    const handleUser=(event)=>{
        setActionType('user')
    }
    return (
        <div>
        
        <Row>
        <Col>
          <Button outline size="sm" theme="primary" className="mb-2 mr-1" onClick={handleOrg}>
            Org
          </Button>
          <Button outline size="sm" theme="primary" className="mb-2 mr-1"onClick={handleUser}>
            User
          </Button>
        </Col>
        </Row>
        <Row>
        <Col>
          {actionType==='user'?<Row><User/></Row>:<Row><OrgMgmt/></Row>}
        </Col>
        
        </Row>
        </div>
    )
}
