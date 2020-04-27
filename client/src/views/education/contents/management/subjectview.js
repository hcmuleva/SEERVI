import React from "react";
import ContentCreator from "./contentCreator";
import { useQuery, useMutation } from "@apollo/react-hooks";
import MUIDataTable from "mui-datatables";
import { GET_UNIT_BY_ID } from "../../../../graphql/queries/education/unit";
export default function Subjectview(props) {
  console.log("props for subject View ", props);
  const columns = [
    {
      name: "id",
      options: {
        display: false,
      },
    },
    "name",
    "url",
    "type",
    "number",
    "description",
  ];
  const options = {
    print: false,
    download: false,
    selectableRows: "none",

    onRowClick: (rowData, rowMeta) => {
      console.log("ROW DATA OF SUBORG =>", rowData);
    },
  };
  const {
    loading: contentLoading,
    error: contentError,
    data: contentData,
  } = useQuery(GET_UNIT_BY_ID, {
    variables: { id: "ck9bnkpmb04uh0884xf0enguk" },
  });
  if (contentError) return <p>Topic ERROR: {contentError.message}</p>;
  if (contentData === undefined) return <p>ERROR in GETTing content</p>;
  if (contentLoading) {
    return <div>TopicData Loading</div>;
  }
  console.log("Topic DATA ", contentData.getUnitById);
  return (
    <div>
      <ContentCreator
        query={GET_UNIT_BY_ID}
        unitid="ck9bnkpmb04uh0884xf0enguk"
        atLevel="UNIT"
        subjectid="ck96ucd6b040l0884c0k16zrr"
        refetchid="ck9bnkpmb04uh0884xf0enguk"
      />
      <MUIDataTable
        title="Content View"
        data={contentData.getUnitById.contents}
        columns={columns}
        options={options}
      />
    </div>
  );
}
