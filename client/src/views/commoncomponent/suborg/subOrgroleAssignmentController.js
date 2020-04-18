import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_SUBORGROLES } from "../../../graphql/queries/roles/roles";
import UserMgmt from "./usermgmt";
export default function SubOrgroleAssignmentController(props) {
  console.log("SubOrgroleAssignmentController", props.id);
  const {
    loading: suborgrolesLoading,
    error: suborgrolesError,
    data: suborgrolesData,
  } = useQuery(GET_SUBORGROLES, { variables: { id: props.id } });
  console.log("suborgrolesData", suborgrolesData);
  const getSUBORGADMINROLE = () => {
    if (suborgrolesData) {
      const myData = suborgrolesData.suborgRoles.filter((role) => {
        if (role.name === "SUBORGADMIN") return role;
      });
      console.log("MYDATA ", myData[0].suborg.org);

      return myData[0];
    }
  };
  const getOrgId = () => {
    if (suborgrolesData) {
      const myData = suborgrolesData.suborgRoles.filter((role) => {
        if (role.name === "SUBORGADMIN") return role;
      });
      console.log("MYDATA ", myData[0].suborg.org);
      return myData[0].suborg.org.id;
    }
  };
  return <UserMgmt orgid={getOrgId()} roledata={getSUBORGADMINROLE()} />;
}
