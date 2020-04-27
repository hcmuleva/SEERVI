import React,{useState} from 'react'
import MUIDataTable from "mui-datatables";
import {GET_USER_BY_ROLEID} from "../../../../../graphql/queries/roles/roles"
import {ASSIGN_SUBJECT_TO_ROLE} from "../../../../../graphql/mutations/subjectassignment/subjectassign"
import { useQuery, useMutation } from "@apollo/react-hooks";
import Chip from "@material-ui/core/Chip";
import { Container, Row, Col } from "shards-react";

export default function UsersWithRole(props) {
  console.log(props," props in user")
    const [assignSubjectToRole] = useMutation(ASSIGN_SUBJECT_TO_ROLE);

  const roleType=props.roleName+ "'S"
  const [userSelected, setUserSelected] = useState({});
    const [userRows, setUserRows] = useState(null);
    const [subjectSelected, setSubjectSelected] = useState({});
    const [subjectRows, setSubjectRows] = useState(null);
    const userColumns=[
      {
      name: "id",
      options: {
        display: false,
      }
      },
      {name:"email", label:"Email"},
      {name:"firstname", label:"FirstName"},
      {name:"lastname", label:"LastName"},
    ]
     const useroptions = {
       filter: true,
       print:false,
       download:false,
       filter:false,
       selectableRows: "single",
     
      rowsSelected: userSelected.rowsSelected,
      onRowsSelect: (rowsSelected, allRows) => {
      console.log("ROW SELECTED in User",allRows)
      setUserSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      setUserRows(allRows);

    },
  };

       const subjectColumns=[
      {
      name: "id",
      options: {
        display: false,
      }
      },
      {name:"name", label:"Name"},
      {name:"std.gradename", label:"Grade"}
    ]
     const subectoptions = {
       filter: true,
       print:false,
       download:false,
       filter:false,
       selectableRows: "multiple",
     
      rowsSelected: subjectSelected.rowsSelected,
      onRowsSelect: (rowsSelected, allRows) => {
      console.log("ROW SELECTED in Subject",allRows)
      setSubjectSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      setSubjectRows(allRows);
    },
  };

   const selectedoptions = {
       filter: true,
       print:false,
       download:false,
       filter:false,
       selectableRows: "none",
  };
  const selectedColumns=[
    {name:"name"}
  ]
    let  roleForData=props.roleList.filter(role=>{if(props.roleName===role.name)return role}) 
    const {loading:userLoading, error:userError, data:userData}= useQuery(GET_USER_BY_ROLEID, {variables:{id:roleForData[0].id}})
    if(userLoading){
    return <div>userLoading Loading</div>;
  }
  if(userError){
    return <div>Error in userError</div>
  }
  let setSelectedUserData;
  if(userRows&&userRows.length>0){
    setSelectedUserData=userData.roleById.users[userRows[0].index]
    console.log("selected User ==>",userRows,"USERS ",userData.roleById.users[userRows[0].index], " SELECTED SUBJECTS",subjectRows)
  }
  let selectedSubjects=[]
  let subjectlist=[]
  if(subjectRows&&subjectRows.length>0){
    subjectRows.map((inx)=>{
      selectedSubjects.push(props.subjects[inx.index])
      subjectlist.push({id:props.subjects[inx.index].id})
    })
  }
    return (
      <div>
         <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    
    <Row noGutters className="page-header py-4">
      <Col lg="1" md="1" sm="1"> 
     
      </Col>
       <Col lg="1" md="1" sm="1">
       
      
       </Col>
       <Col lg="1" md="1" sm="1">
         </Col>
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="6" md="12">
       <MUIDataTable
        title={roleType}
        data={userData.roleById.users}
        columns={userColumns}
        options={useroptions}
      />

         </Col>

      {/* Sidebar Widgets */}
      <Col lg="3" md="12">
      <MUIDataTable
        title="SubjectForAssignment"
        data={props.subjects}
        columns={subjectColumns}
        options={subectoptions}
      />
      </Col>
      <Col lg="3" md="12">
     {subjectRows&&subjectRows.length>0?

      
        <MUIDataTable
        title={setSelectedUserData.email}
        data={selectedSubjects}
        columns={selectedColumns}
        options={selectedoptions}
      />
        :""
     }
      {subjectRows&&subjectRows.length>0? <button onClick={()=>{
           
              const mutationdata= {
                  userid: userData.roleById.users[userRows[0].index].id,
                  subsType:"free",
                  mySubjects: subjectlist,
                  subscribedAs:roleForData[0].id
                }
                console.log("Data for Mutation ",mutationdata)
                 assignSubjectToRole({
                variables:mutationdata
              })
                
              
        }}>Assign</button>:""}
      </Col>

    </Row>
  </Container></div>
    )
}
