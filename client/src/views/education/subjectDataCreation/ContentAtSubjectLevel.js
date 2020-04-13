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
export default function ContentAtSubjectLevel() {
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
    console.log("mysubjects",data.mySubscription)
    
    
    return (
        <div>
        
       
            {
                  data.mySubscription.map(
                     (sub)=>{
        
                    return sub.mySubjects.map((mysub)=>{
                        console.log("MYSUB",mysub)
                        return <Col lg="3" sm="6" className="mb-2" key={mysub.id}>
                    <Card small className="card-post card-post--aside card-post--1">
                    <div className="card-post__image" style={{ backgroundImage: `url('${mysub.id}')` }}>
                        <Badge
                    pill
                    className={`card-post__category bg-${mysub.name}`}
                  onClick={()=>{console.log("Here is Subject DETAILS ",mysub)}}>
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
                    })
            })
        }
   
    
        </div>
    )
}
