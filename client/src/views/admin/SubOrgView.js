import React, { useState } from "react";
import SelectComponent from "./SelectComponent";
import { GET_ORGS } from "../queries/getAllOrgs";
import { useQuery, useMutation } from "@apollo/react-hooks";
import SubOrgPage from './subOrgPage'
export default function SubOrgView() {
  const [selectedOrg, setSelectedOrg] = useState(null);

  const { loading: orgLoading, error: orgError, data: orgData } = useQuery(
    GET_ORGS
  );

  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {
    return <div>ORG Loading</div>;
  }

  return (
    <div>
      <SelectComponent
        title={"ORG"}
        listdata={orgData.allorgs}
        setSelected={setSelectedOrg}
      />
    {selectedOrg?<SubOrgPage id={selectedOrg.id} title={"SUBORG Create"}/>:""}
    </div>
  );
}
