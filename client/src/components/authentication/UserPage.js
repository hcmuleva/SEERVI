import React, { useState } from "react";
import gql from 'graphql-tag';
import {
     Container,
  Row,
  Badge,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";

import { useMutation,useQuery } from '@apollo/react-hooks';
export const GET_SUBSCRIPTION = gql`
   query GET_SUBSCRIPTION{
  mySubscription{
    id
    subsType
    mySubjects{
      id
      name
      medium{
        id
        name
      }
    }
  }
}
   `;

export default function UserPage() {
    const { loading, error, data } = useQuery(GET_SUBSCRIPTION);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    let mysubjects=[]
    data.mySubscription.map(
        (sub)=>{
        
            sub.mySubjects.map((mysub)=>{
                console.log("SUB",mysub.name)
                mysubjects.push(mysub)
                return mysub.name
            })
        }
   
    );
    console.log("mysubjects",mysubjects)
    
    
    return (
        <div>
        <Container fluid className="main-content-container px-4">
             <div>
                   <Row>
            {!data ?<h1>User require action</h1>: 
            mysubjects.map((mysub,index)=>{

               return (
              
                    <Col lg="3" sm="6" className="mb-2" key={index}>
                    <Card small className="card-post card-post--aside card-post--1">
                    <div className="card-post__image" style={{ backgroundImage: `url('${index}')` }}>
                        <Badge
                    pill
                    className={`card-post__category bg-${mysub.name}`}
                  >
                   {mysub.name}
                  </Badge>
                    </div>
                <CardHeader className="border-bottom">
                    <h6 className="m-0"> {mysub.name}</h6>
                </CardHeader>
                <CardBody className="p-0">
      
                </CardBody>
                
            </Card> 
            </Col>
                 )
           
            })
            
            }
              </Row>
                   </div>
            </Container>
        </div>
    )
}
