import React ,{useState} from 'react'
import { useQuery,useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ButtonToolbar,
    ButtonGroup,
    Button
  } from "shards-react";
  import User from '../user/User'
export const CREATE_ORG = gql`
    mutation CREATEORGANIZATION($orgName:String!, $orgDescription:String!){
        createOrganization(data:{name:$orgName,description:$orgDescription}){
        id
        name
        description
  }
    }`;
export const GET_ORG = gql`
query ORGS{
    orgs{
    id
    name
    description
  }
}`;
export default function OrgMgmt() {
    const [createOrg] = useMutation(CREATE_ORG);
    const { loading, error, data } = useQuery(GET_ORG);
    const [orgName, setOrgName]=useState("");
    const [orgDescription, setOrgDescription]=useState("");
    const [isUser, setIsUser]= useState(false);
    const [userData,setUserData]=useState({})
    
    const handleOrg=(e)=>{
        e.preventDefault()
        console.log("name ",orgName)
        console.log("name ",orgDescription)
        createOrg({ variables: { orgName,orgDescription },refetchQueries: [{ query: GET_ORG }] }).then((res)=>{
            console.log("Result ", JSON.stringify(res))
        }).catch(err=>{  
            console.log(err.message)
        })
        setOrgName('')
        setOrgDescription('')
    }
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const createUsersHandle=(e)=>{
        e.preventDefault()
        console.log("Create user ",e.target)
        const name=e.currentTarget.attributes['name'].value
        const id=e.currentTarget.attributes['id'].value
        const orgData={"name":name,"id":id}
        setUserData(orgData)
        setIsUser(true)
    }
    console.log("Data",JSON.stringify(data.orgs))
    return (
        <div>
    
        <Row noGutters className="page-header py-4">
        <Form>
        <div>
      <FormInput name="org" size="sm" placeholder="Org Name" className="mb-2" value={orgName} onChange={e => setOrgName(e.target.value)}/>
      <FormInput name="description" size="sm"  placeholder="Org Description" className="mb-2" value={orgDescription}  onChange={e => setOrgDescription(e.target.value)}/>
      <button type="submit" onClick={handleOrg}>Submit</button>
    </div>
        </Form>
        </Row>
        <Row>   
<table className="table mb-0">
<thead className="bg-light">
                <tr>
                  <th scope="col" className="border-1">
                    ORG NAME
                  </th>
                  <th scope="col" className="border-1">
                    Description
                  </th>
                  </tr>
                  </thead>   
<tbody>
{data.orgs.map((org, i) => {
    console.log(org)
  return (
      <tr key={org.id} >
        <td>{org.name}</td>
        <td>{org.description}</td>
        <td><div id={org.id} name={org.name} onClick={createUsersHandle}>Add Users</div></td>
      </tr>
  );
})}
</tbody>
</table>  
<Col lg="8" md="12">
       <div>
       {isUser? 
        <User userData={userData}/>:('')}</div>
</Col>
</Row>
        </div>
       
    )
}
