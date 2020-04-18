import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_ORGROLES } from "../../../graphql/queries/roles/roles";
import UserMgmt from "./usermgmt";
export default function OrgroleAssignmentController(props) {
  console.log("OrgroleAssignmentController =>", props);
  const {
    loading: rolesLoading,
    error: rolesError,
    data: rolesData,
  } = useQuery(GET_ORGROLES, { variables: { id: props.orgid } });

  const getORGADMINROLE = () => {
    console.log("PROCESSING FOR ORGADIN");
    if (rolesData) {
      const myData = rolesData.orgRoles.filter((role) => {
        console.log("Filter Role ", role);
        if (role.name === "ORGADMIN") return role;
      });
      console.log("MYORG ROLE DATA ", myData);
      return myData[0];
    } else return {};
  };
  return <UserMgmt orgid={props.orgid} roledata={getORGADMINROLE()} />;
}
