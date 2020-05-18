import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { CREATE_UNIT } from "../../service/graphql/education/teacher/mutations/unit";
import { GET_SUBJECT_BY_ID } from "../../service/graphql/education/common/queries/subjects";

export function UnitCreateDialog(props) {
  const subjectid = props.subjectid;
  const [dialogState, setDialogState] = useState(false);
  const [unitName, setUnitName] = useState("");
  const [createUnit] = useMutation(CREATE_UNIT);
  //const [state, setState] = useState(false);

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => {
            createUnit({
              variables: {
                name: unitName,
                subject: subjectid,
              },
              refetchQueries: () => [
                {
                  query: GET_SUBJECT_BY_ID,
                  variables: { id: subjectid },
                },
              ],
            })
              .then((res) => {
                console.log("Created Unit", res);
                setDialogState(false);
              })
              .catch((err) => {
                throw new Error("Error in creating Unit");
              });
          }}
        />
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => {
            console.log("CANCEL");
            setDialogState(false);
          }}
          className="p-button-secondary"
        />
      </div>
    );
  };
  return (
    <div>
      {" "}
      <Dialog
        header="Create Unit"
        visible={dialogState}
        style={{ width: "30vw" }}
        modal={true}
        onHide={() => setDialogState(false)}
        footer={renderFooter("displayBlockScroll")}
      >
        <span className="p-float-label">
          <InputText
            id="in"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />
          <label htmlFor="in">UnitName</label>
        </span>
      </Dialog>
      <Button
        label="Unit"
        icon="pi pi-info-circle"
        onClick={(e) => setDialogState(true)}
      />
    </div>
  );
}
