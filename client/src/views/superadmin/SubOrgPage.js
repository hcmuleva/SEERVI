import React , { useState, useEffect } from 'react'
import SingleCard from './SubOrgPage'
import { Container, Row, Col ,Card} from "shards-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MediaCard from "./MediaCard";

import { GET_ORGS } from "../queries/getAllOrgs";

export default function SubOrgPage(props) {
const [subOrgs,setSubOrgs] = useState([])    
const { loading, error, data } = useQuery(GET_ORGS);
if (error ) return <p>ERROR: {error.message}</p>;
if (loading) {
    return <div>Orgs are Loading</div>;
} 

const orgSelection=(data)=>{
console.log("selected ORg ",data)
}
const subOrgList=[]
const myOrgData = data.getOrg.map(org => {
    console.log("ORG ",org)
    if(props.orgid===org.id){
        subOrgList.push(org.subOrgs)
        
    
    }
    setSubOrgs(org.subOrgs)
});
    const mySubOrgs =subOrgs.map((sOrg)=>{
        return (
    <Col lg="3" md="6" sm="12" className="mb-4" key={sOrg.id}>
        <MediaCard data={sOrg} orgSetter={orgSelection} />
    </Col>
    );
    })
    return (
        <div>
            {mySubOrgs}           
        </div>
    )
}
