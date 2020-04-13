import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_ORGS } from "../../../../graphql/queries/administration/org";
import FileSystemNavigator from "./treecomp";
export default function Suborg() {
  const { loading: orgLoading, error: orgError, data: orgData } = useQuery(
    GET_ORGS
  );
  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {
    return <div>ORG Loading</div>;
  }
  console.log("orgData", orgData);
  return <FileSystemNavigator data={orgData.allorgs} />;
}
