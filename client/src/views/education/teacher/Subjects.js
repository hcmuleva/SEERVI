import React from 'react'
import SubjectAdder from "../admin/SubjectAdder"
import RoleListCardView from "../../roleView/RoleListCardView"
export default function Subjects() {
    const myroleList=[{"id":"1123","name":"TEACHER","categoryTheme": "warning","authorAvatar":"TBD"},{"id":"2123","name":"ORGADMIN","categoryTheme": "success","authorAvatar":"TBD"},{"id":"3123","name":"STUDENT","categoryTheme": "info","authorAvatar":"TBD"}]
    return (
        <div>
            <h3>Subject Mgmt</h3>
             <RoleListCardView roleList={myroleList}/>
            <SubjectAdder/>
        </div>
    )
}
