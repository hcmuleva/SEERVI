import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_GROUPROLES } from "../../../graphql/queries/roles/roles";
import UserMgmt from "../suborg/usermgmt";
export default function GrouproleAssignmentController(props) {
  console.log("GrouproleAssignmentController", props.id);
  const {
    loading: grouprolesLoading,
    error: grouprolesError,
    data: grouprolesData,
  } = useQuery(GET_GROUPROLES, { variables: { id: props.id } });
  console.log("grouprolesData", grouprolesData);
  const getGROUPADMINROLE = () => {
    if (grouprolesData) {
      const myData = grouprolesData.groupRoles.filter((role) => {
        if (role.name === "GROUPADMIN") return role;
      });
      console.log("MYDATA ", myData[0].group.org);

      return myData[0];
    }
  };
  const getOrgId = () => {
    if (grouprolesData) {
      const myData = grouprolesData.groupRoles.filter((role) => {
        if (role.name === "GROUPADMIN") return role;
      });
      console.log("MYDATA ", myData[0].group.suborgid.org);
      return myData[0].group.suborgid.org.id;
    }
  };
  return <UserMgmt orgid={getOrgId()} roledata={getGROUPADMINROLE()} />;
}
