import {
    Row,
    Col,
    Form,
    FormFeedback,
    FormInput,
    Button
  } from "shards-react";
import React,{useState} from 'react'
import gql from 'graphql-tag';

import { useMutation, useQuery } from '@apollo/react-hooks';
export const CREATE_ROLE = gql`
    mutation CREATEROLE($rolename:String!){
        createRole(data:{rolename:$rolename}){
            id rolename
    }}`

export const GET_ROLES = gql`
    query GETROLES{
        roles{
        id
    }}
`
export default function CreateRole() {
    const [rolename, setRolename] = useState("")
    const [roleCreate] = useMutation(CREATE_ROLE);
    const { loading, error, data } = useQuery(GET_ROLES);
    const handleSubmit = (event) => {
        event.preventDefault();
    
        roleCreate({ variables: { rolename },refetchQueries: [{ query: GET_ROLES }]  }).then((res)=>{
            console.log("ROLE CREATION DATA",res)
        }).catch(err=>{
           
            throw new Error("Error in creating subOrg")
        })
    }
    if(loading){
        return <div>Loding...</div>
    } if (error) {
    console.error(error);
    return <div>Error!</div>;
  
    }else {
        console.log("DATA ",data)
    }
    return (
        <Col sm="12" md="4">
            <strong className="text-muted d-block mb-2">Create Role</strong>
            <Form>
                <Row form>
                   
                    <Col md="4" className="form-group">
                        <FormInput
                            placeholder="Role Name"
                            required

                            onChange={e => setRolename(e.target.value)}
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
                            roleName
                      </th>

                    </tr>
                </thead>
                <tbody>
                    {data.roles.map((role, i) => {
                        console.log(role)
                        return (
                            <tr key={role.id} >
                                <td>{role.rolename}</td>


                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Col>



    )
}
