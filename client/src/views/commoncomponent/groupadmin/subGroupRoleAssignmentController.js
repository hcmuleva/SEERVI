import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_SUBGROUPROLES } from "../../../graphql/queries/roles/roles";
import UserMgmt from "../suborg/usermgmt";
export default function SubGroupRoleAssignmentController(props) {
  console.log("props GroupRoleAssignmentController ", props);
  const {
    loading: rolesLoading,
    error: rolesError,
    data: rolesData,
  } = useQuery(GET_SUBGROUPROLES, { variables: { id: props.id } });
  console.log("rolesData =>", rolesData);
  const getSubGROUPADMINROLE = () => {
    if (rolesData) {
      const myData = rolesData.subGroupRoles.filter((role) => {
        if (role.name === "SUBGROUPADMIN") return role;
      });
      console.log("MYDATA ", myData);
      return myData[0];
    }
  };
  return (
    <UserMgmt
      title="Group Admin Assignment"
      orgid={props.orgid}
      roledata={getSubGROUPADMINROLE()}
    />
  );
}
