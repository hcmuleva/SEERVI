import React, {useState} from 'react'
import {
    Row,
    Col,
    Form,
    
    FormFeedback,
    FormInput,
    
    Button
    
  } from "shards-react";
  import ListGroups from "./ListGroups"
  import gql from 'graphql-tag';
  import { useMutation, useQuery } from '@apollo/react-hooks';

  export const CREATE_SUBORG = gql`
    mutation CREATESUBORG($name:String!, $org:String!){
        createSubOrg(data:{name:$name,org:$org}){
            name id org{ id name }
        }}`;
export const GET_SUBORG = gql`
query ORGS{
    id
    subOrganizations{
    id
    name
  }
}`;
export default function CreateSubOrg() {
    const [suborg,setSuborg] = useState("")
    const [subOrgCreation] = useMutation(CREATE_SUBORG);
   const { loading, error, data } = useQuery(GET_SUBORG);
    const authData=JSON.parse(localStorage.getItem("authdata"))
    const orgdarta=authData.org
    const orgid=orgdarta.id
    console.log("AuthData for CreateSubOrg",JSON.stringify(orgdarta.id))
    const handleSubmit = (event) => {
        event.preventDefault();
    
        subOrgCreation({ variables: { name:suborg,org:orgid },refetchQueries: [{ query: GET_SUBORG }]  }).then((res)=>{
            console.log("SUBORG CREATION DATA",res)
        }).catch(err=>{
           
            throw new Error("Error in creating subOrg")
        })
    }
    
    if(loading){
        return <div>Loding...</div>
    } if (error) {
    console.error(error);
    return <div>Error!</div>;
  
    }
    return (
            <Col sm="12" md="4">
    <strong className="text-muted d-block mb-2">SubOrg Creation {suborg}</strong>
    
    <Form>
      <Row form>
      <Col md="4" className="form-group">
          <FormInput
            placeholder="SubOrg Name"
            required
            value={orgdarta['name']}
            onChange={() => {}}
          />
          <FormFeedback valid>The first name looks good!</FormFeedback>
        </Col>
        <Col md="4" className="form-group">
          <FormInput
            placeholder="SubOrg Name"
            required
            
            onChange={e => setSuborg(e.target.value)}
          />
          <FormFeedback valid>The first name looks good!</FormFeedback>
        </Col>
        
      </Row>
      <Button outline size="sm" theme="primary" className="mb-2 mr-1" onClick={handleSubmit}>
      Submit
    </Button>
    <Button outline size="sm" theme="secondary" className="mb-2 mr-1">
    reset
  </Button>
    </Form>
    <div>dd</div>
    <table className="table mb-0">
    <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-1">
                        Sub ORG NAME
                      </th>
                      
                      </tr>
                      </thead>   
    <tbody>
    {data.subOrganizations.map((org, i) => {
        console.log(org)
      return (
          <tr key={org.id} >
            <td>{org.name}</td>
            <td><ListGroups id={org.id}/></td>
           
          </tr>
      );
    })}
    </tbody>
    </table>  
  </Col>

       
       
    )
}
