import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Content } from "./content/Content";
import { Question } from "./question/Question";
export function ContentTypes(props) {
  let history = useHistory;
  const cars = [
    { label: "MATERIAL", value: "MATERIAL" },
    { label: "QUESTION", value: "QUESTION" },
    { label: "EXAMS", value: "EXAMS" },
    { label: "FORMULA", value: "FORMULA" },
    { label: "TIPS&TRICS", value: "TIPS&TRICS" },
    { label: "PAPERS", value: "PAPERS" },
  ];
  const [selected, setSelected] = useState(null);
  const [state, setState] = useState(cars);

  const onChange = (e) => {
    props.setType(e.value);
    setSelected(e.value);
  };
  return (
    <div className="content-section implementation">
      <Dropdown
        value={selected}
        options={state}
        onChange={onChange}
        style={{ width: "12em" }}
        filter={true}
        filterPlaceholder="Select Car"
        filterBy="label,value"
        showClear={true}
      />
    </div>
  );
}
