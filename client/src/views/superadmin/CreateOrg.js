import React,{useState} from 'react'
import { Container, Row, Col ,Button} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import MediaCard from './MediaCard'
import { useQuery ,useMutation} from '@apollo/react-hooks';
import {GET_ORGS} from '../queries/getAllOrgs'
import{CREATE_ORG} from '../mutations/org.js'
import gql from 'graphql-tag';

export default function CreateOrg() {
  const [orgname,setOrgname]=useState('')
   const [orgCreate] = useMutation(CREATE_ORG);

  const [orgDescription,setOrgDescription]=useState('')
  
  const { loading, error, data } = useQuery(GET_ORGS)
  let myOrgData=null
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;
  if (loading) {return <div>Loading</div>;}
  else {
    myOrgData=data.getOrg.map((org)=>{
      return (
        <Col lg="3" md="6" sm="12" className="mb-4" key={org.id}> 
          <MediaCard data={org}/>
          </Col>
      )
    })
  }

  const addOrgHandel=(e)=>{

    console.log("Button clicked",orgname, orgDescription)

    orgCreate({ variables: { name:orgname,description:orgDescription },refetchQueries: [{ query: GET_ORGS }]  }).then((res)=>{
            console.log("ORG  CREATION DATA",res)
        }).catch(err=>{
           
            throw new Error("Error in creating Org")
        })


  }
    return (
      
        <div>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
        
      <PageTitle title="Org Management" subtitle="ORGS" className="text-sm-left mb-3" />
    </Row>
    <Row>
      <input name="orgname" type="text" placeholder="Enter OrgName" onChange={(e) => {setOrgname(e.target.value)}}/>
      <input name="description" type="text" placeholder="Enter Description" onChange={(e) => {setOrgDescription(e.target.value)}}/>
      <Button outline size="sm" theme="primary" className="mb-2 mr-1" onClick={addOrgHandel}>
            add
          </Button>
      
    </Row>
    <Row>
    {myOrgData}
    
    </Row>
        
        </Container>
          
        </div>
    )
}
