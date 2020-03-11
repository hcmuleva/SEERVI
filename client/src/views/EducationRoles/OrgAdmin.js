import React, {useState} from 'react'
import SubOrgPage from '../../views/admin/subOrgPage.js'

export default function OrgAdmin() {
     
    const getOrgComponent = ()=>{
        const metaData=JSON.parse(localStorage.getItem('metadata'))
        console.log("METADATA for orgadmin",metaData.org)
        return metaData.org.id
        
        
    }
    return (
        <div>
              <h1>OrgAdmin Page</h1> 
             
                {<SubOrgPage id={getOrgComponent()} title={"SUBORG Create"}/>}

        </div>
    )
}
