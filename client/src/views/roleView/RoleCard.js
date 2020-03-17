import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Badge,
  Button
} from "shards-react";
import TeacherRole from "./TeacherRole";
import StudentRole from "./StudentRole"
import OrgAdminRole from "./OrgAdminRole"
export default function RoleCard(props) {
    const role = props.role
    const idx=props.role.idx
    console.log("Hasish inside react card")
    switch (role.name) {
        case "TEACHER":
            return <TeacherRole role={role} idx={idx}/>
          
        case "STUDENT":
            return <StudentRole role={role} idx={idx}/>
              break;
        case "ORGADMIN":
            return <OrgAdminRole role={role} idx={idx}/>
              break;
        default:
            return <div>Not available</div>
    }
   
}
