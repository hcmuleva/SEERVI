import React, { useState } from "react";
import SelectComponent from "./SelectComponent";
import { GET_ORGS } from "../queries/getAllOrgs";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Row, Col, Card, CardHeader, CardBody } from "shards-react";
import GroupPage from './groupPage'
export default function GroupView() {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedSubOrg, setSelectedSubOrg] = useState(null);

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
      <Row>
        <Col>   
            <SelectComponent
                title={"ORG"}
                listdata={orgData.allorgs}
                setSelected={setSelectedOrg}
            />
        </Col>
         <Col>
             {selectedOrg?<SelectComponent
                title={"SubORG"}
                listdata={selectedOrg.suborgs}
                setSelected={setSelectedSubOrg}
            />:""}
         </Col>

      </Row>

      <Row>
          {selectedSubOrg?<GroupPage id={selectedSubOrg.id} title={"Group Create"}/>:""}
      </Row>
    </div>
  );
}
