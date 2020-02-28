import React from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";

import {GET_ORGS,GET_ORGROLES } from "../views/queries/getAllOrgs";

export default function HCMTBDPage() {

  const { loading:rolesLoading, error:rolesError, data:rolesData } =  useQuery(GET_ORGROLES,{variables:{id:"ck6yektdm0iu50784wgl42co4"}})
    if (rolesError) return <p>rolesError ERROR: {rolesError.message}</p>;
    if(rolesData === undefined) return <p>ERROR</p>;
    if (rolesLoading) {return <div>rolesLoading </div>;}
    console.log("rolesData",rolesData)
    return (
        <div>
            <h1> Hello Harish</h1>
        </div>
    )
}
