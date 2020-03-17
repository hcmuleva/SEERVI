import React from 'react'
import {
  Container,
  CardHeader,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

export default function TeacherRole(props) {
    const role = props.role
    const idx=props.role.idx
    return (
        <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
                        <Card small className="card-post card-post--1"> 
                         <CardHeader >Teacher</CardHeader>
                            <div className="card-post__image" >
                                <Badge pill className={`card-post__category bg-${role.categoryTheme}`} >
                                {role.name}
                                </Badge>
                                <div className="card-post__author d-flex">
                                    <a href="#" className="card-post__author-avatar card-post__author-avatar--small"
                                        style={{ backgroundImage: `url('${role.authorAvatar}')` }} >
                                            Written by {role.authorAvatar}
                                    </a>
                                </div>
                            </div>
                            <CardFooter className="border-top d-flex">
                                         &nbsp;
                                          &nbsp;
                                            &nbsp;
                                        <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
                                         <Badge pill className={`card-post__category bg-${role.categoryTheme}`} >
                                         {role.name}
                                        </Badge>
                                        </Col>
                                        &nbsp;
                                          &nbsp;
                                            &nbsp;
                                              &nbsp;
                                                &nbsp;
                                                 &nbsp;
                                              &nbsp;
                                                &nbsp;
                                         <Col lg="1" md="3" sm="6" className="mb-4" key={idx}>
                                             <Badge pill className={`card-post__category bg-${role.categoryTheme}`} >
                                         {role.name}
                                        </Badge>
                                         </Col>
                                         &nbsp;
                                           &nbsp;
                                             &nbsp;
                                               &nbsp;
                                                 &nbsp;
                                                  &nbsp;
                                              &nbsp;
                                                &nbsp;
                                          <Col lg="1" md="3" sm="6" className="mb-4" key={idx}>
                                              <Badge pill className={`card-post__category bg-${role.categoryTheme}`} >
                                         {role.name}
                                        </Badge>
                                         </Col>
                              
                            
                            </CardFooter>
                        </Card>
                        </Col>  
    )
}
