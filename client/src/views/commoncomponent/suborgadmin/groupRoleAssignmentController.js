import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_GROUPROLES } from "../../../graphql/queries/roles/roles";
import UserMgmt from "../suborg/usermgmt";
export default function GroupRoleAssignmentController(props) {
  console.log("props GroupRoleAssignmentController ", props);
  const {
    loading: rolesLoading,
    error: rolesError,
    data: rolesData,
  } = useQuery(GET_GROUPROLES, { variables: { id: props.id } });
  console.log("rolesData =>", rolesData);
  const getSUBORGADMINROLE = () => {
    if (rolesData) {
      const myData = rolesData.groupRoles.filter((role) => {
        if (role.name === "GROUPADMIN") return role;
      });
      console.log("MYDATA ", myData);
      return myData[0];
    }
  };
  return (
    <UserMgmt
      title="SUBORG Admin Assignment"
      orgid={props.orgid}
      roledata={getSUBORGADMINROLE()}
    />
  );
}
