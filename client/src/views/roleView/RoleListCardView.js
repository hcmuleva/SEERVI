import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import RoleCard from './RoleCard'
export default function RoleListCardView(props) {
    return (
        <div>
           <Container fluid className="main-content-container px-4">
           <Row>
            {props.roleList.map((role,idx)=>{   
               return ( <RoleCard key={idx} idx={idx} role={role} />)
            })}
           </Row>
           </Container>
        </div>
    )
}
