import React, {useState,useEffect} from 'react'
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import Editor from "../../components/add-new-post/Editor";
import SidebarActions from "../../components/add-new-post/SidebarActions";
import SidebarCategories from "../../components/add-new-post/SidebarCategories";
import { useQuery ,useMutation} from '@apollo/react-hooks';


import {GET_ORGS,GET_GROUPS} from '../queries/getAllOrgs'
import{CREATE_ORG} from '../mutations/org.js'

import Orgs from './orgPage';
import SubOrgs from './subOrgPage';
import Suborgs from './suborgs'
import OrgTable from './orglist'
import GroupTable from './grouplist'
import SubOrgTable from './suborgliist' 
import Groups from './groupPage'
import SubGroupList from './subgrouplist'
import SubGroupPage from './subGroupPage'
export default function SuperAdmin() {
    const [orgCreate] = useMutation(CREATE_ORG);
    const [rowSelected,setRowSelected]=useState('')
    const orgDataCreated=[{id:"1",name:"org1",description:"test"},{id:"2",name:"org2",description:"test2"},{id:"3",name:"org3",description:"test3"}]
    const { loading:orgLoading, error:orgError, data:orgData } = useQuery(GET_ORGS)
    const { loading:groupLoading, error:groupError, data:groupData } = useQuery(GET_GROUPS)
    const [subOrgDataInput,setSubOrgDataInput] = useState(null);
    const [selectedSubOrg,setSelectedSubOrg]=useState(null);
    const [selectedSubOrgId, setSelectedSubOrgId]=useState(null)
    const [selectGroup,setSelectGroup]=useState(null);
    const [subGroup, setSubGroup] = useState([]);
    const setSelectedRowData=(row)=>{
        const selectedRowData=orgData.allorgs.filter((org)=>{
            if(org.name===row) return org
        })
        setSubOrgDataInput(selectedRowData[0])
        setRowSelected(row)
    }
    const setSubOrgSelectedRowData=(row,id)=>{
        setSelectedSubOrg(row)
        setSelectedSubOrgId(id)
    }
    const getSelectedRow=()=>{
        return rowSelected;
    }
    const getSelectedOrgId=()=>{
        
        return subOrgDataInput?subOrgDataInput.id:null
    }
    const suborghandler= (createdSubOrg)=>{
       subOrgDataInput.suborgs.push(createdSubOrg)
    }
    const setGroupSelectedRowData=(grouprow, id)=>{
       
        setSelectGroup(id)
    }
    const getGroupId=()=>{
        return selectGroup
    }
    const getSubGroups=(groupId)=>{
        console.log("groupId getSubGroup ",groupId)
        if(groupData){
            const myselectedGroup=groupData.allGroups.filter((grp)=>{if(grp.id===groupId)return grp})
            console.log("myselectedGroup",myselectedGroup)
        if(myselectedGroup&&myselectedGroup.length>0){
            const myGrpElm= myselectedGroup[0]
            console.log("Element ",myGrpElm)
            if(myGrpElm.subgroups){
                console.log("myGrpElm.subgroups ",myGrpElm.subgroups)
                return myGrpElm.subgroups
            } else {
                console.log("myGrpElm.subgroups Returning Empty arrayh")
                return false
            }
        }else {
            console.log("False arrayh")
            return false
        }
        }
        
    }
    if (orgError) return <p>Org ERROR: {orgError.message}</p>;
    if (orgData === undefined) return <p>ERROR</p>;
    if (orgLoading) {return <div>ORG Loading</div>;}
    return (

        <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="SuperAdmin" subtitle="Org Management" className="text-center" />
            </Row>
 
        {/* Admon Org Creatiioin  */}
            <Row>
                <Col lg="9" md="12">
                <Row>
                    <Col lg="3" md="4">
                        <Orgs title="ORG"/>
                    </Col>
                    <Col lg="4" md="8">
                        <OrgTable orgdata={orgData.allorgs} orgName={"HCM1"} rowSelected={setSelectedRowData}/>
                    </Col>
                      <Col lg="3" md="4">
                        <SubOrgs title={rowSelected} orgid={getSelectedOrgId()} suborghandler={suborghandler}/>
                    </Col>
                    <Col lg="4" md="8">
                        {rowSelected?<SubOrgTable suborgdata={subOrgDataInput.suborgs}  orgName={"HCMSUBORG"} subOrgRowSelected={setSubOrgSelectedRowData}/>:console.log("ROW need to selecte")}
                        
                    </Col>

                </Row>
               
                <Row>
                   
                   <Col lg="3" md="4">
                   {selectedSubOrg? "":<div></div>}
                    {selectedSubOrg?<Groups title="Group" suborgid={selectedSubOrgId} />:<div></div>}
    
                    </Col>
                    <Col lg="4" md="8">
                        {selectedSubOrg?<GroupTable groupdata={groupData.allGroups} subOrgName={"HCM"}  groupHandler={setGroupSelectedRowData}/>
                    :<div></div>}
                    </Col>
                </Row>
                {selectGroup&&getSubGroups(selectGroup)? <SubGroupPage groupid={getGroupId()}/>:<Row></Row>}
                {selectGroup&&getSubGroups(selectGroup)?  <SubGroupList subgroups={getSubGroups(selectGroup)}/>:<Row></Row>}
               
                </Col>

        </Row>
        </Container>
    )
}
