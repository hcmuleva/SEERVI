import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_UNIT_BY_ID } from "../../service/graphql/education/common/queries/unit";

export default function UnitView() {
  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(
    GET_UNIT_BY_ID,
    {
      variables: { id: props.unitid },
    }
  );
  if (unitError) {
    console.log("UNIT ERROR", unitError);
    return <p>Unit ERROR: {unitError.message}</p>;
  }
  if (unitData === undefined) {
    console.log("UNIT DATA UNDIFINED");
    return <p>ERROR in GETTing unit</p>;
  }
  if (unitLoading) {
    console.log("UNIT DATA is LOADING");
    return <div>UnitData Loading...</div>;
  }

  return <div></div>;
}
