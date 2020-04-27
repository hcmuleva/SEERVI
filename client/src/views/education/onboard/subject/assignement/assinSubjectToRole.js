import React,{useState} from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {GET_SUBJECTS_OF_SUBGROUP } from "../../../../../graphql/queries/subgroup/subgroup"
import { Container, Row, Col } from "shards-react";
import UsersWithRole from "./users_subjectTables"
export default function AssinSubjectToRole() {
    const [rolechecked, setRoleChecked] = React.useState(false);

    const subgroupid =localStorage.getItem('subgroup')
   const {loading:subjectLoading,error:subjectError,data:subjectData} =useQuery(GET_SUBJECTS_OF_SUBGROUP,{variables:{id:subgroupid}})
   console.log("loading",subjectLoading)
   console.log("error",subjectError)
   let teacherRole;
   if(subjectData)
    teacherRole=subjectData.subgroupById.subgroupRoles.filter(role=>{if("TEACHER"===role.name)return role}) 
    if(teacherRole)console.log(teacherRole[0].id,"teacherRole")
  
  if(subjectLoading){
    return <div>Subject Loading</div>;
  }
  if(subjectError){
    return <div>Error in Subject</div>
  }

    const toggleChecked = () => {
    setRoleChecked((prev) => !prev);
    
  };
  return (
     
   <div>
    <MultiSelect
           rolechecked={rolechecked}
          toggleChecked={toggleChecked}
        />
   {teacherRole&&rolechecked?<UsersWithRole roleName="STUDENT" roleList={subjectData.subgroupById.subgroupRoles} subjects={subjectData.subgroupById.subjects}/>:<div>Role Not Found</div>}
   {teacherRole&&!rolechecked?<UsersWithRole roleName="TEACHER" roleList={subjectData.subgroupById.subgroupRoles} subjects={subjectData.subgroupById.subjects}/>:<div>Role Not Found</div>}
    
    </div>
   
  );
}

function MultiSelect(params) {
  return (
    <FormGroup>
    <Row>
     TEACHER
      <FormControlLabel
        control={
          <Switch
            checked={params.userchecked}
            onChange={params.toggleChecked}
          />
        }
        label="STUDENTs"
      />
    </Row>
     
    </FormGroup>
  );
}
