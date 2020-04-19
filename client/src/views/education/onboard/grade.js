import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_STD } from "../../../graphql/mutations/education/std";

export default function grade() {
  const [createGrade] = useMutation(CREATE_STD);
  const grades = [
    { gradename: "LKG", category: "PRIMARY" },
    { gradename: "UKG", category: "PRIMARY" },
    { gradename: "I", category: "PRIMARY" },
    { gradename: "II", category: "PRIMARY" },
    { gradename: "II", category: "PRIMARY" },
    { gradename: "III", category: "PRIMARY" },
    { gradename: "IV", category: "PRIMARY" },
    { gradename: "V", category: "PRIMARY" },
    { gradename: "VI", category: "MIDDLE" },
    { gradename: "VII", category: "MIDDLE" },
    { gradename: "VIII", category: "MIDDLE" },
    { gradename: "IX", category: "HIGHSCHOOL" },
    { gradename: "X", category: "HIGHSCHOOL" },
    {
      gradename: "XI",
      category: "HIGHERSECONDARY",
      branch: "ART",
      specilize: "ART",
      year: "I",
    },
    {
      gradename: "XI",
      category: "HIGHERSECONDARY",
      branch: "BIOLOGY",
      specilize: "SCIENCE",
      year: "I",
    },
    {
      gradename: "XI",
      category: "HIGHERSECONDARY",
      branch: "COMMERCE",
      specilize: "COMMERCE",
      year: "I",
    },
    {
      gradename: "XI",
      category: "HIGHERSECONDARY",
      branch: "MATHEMATICS",
      specilize: "SCIENCE",
      year: "I",
    },
    {
      gradename: "XI",
      category: "HIGHERSECONDARY",
      branch: "HOMESCINCE",
      specilize: "SCIENCE",
      year: "I",
    },
    {
      gradename: "XI",
      category: "HIGHERSECONDARY",
      branch: "COMPUTERSCINCE",
      specilize: "SCIENCE",
      year: "I",
    },

    {
      gradename: "XII",
      category: "HIGHERSECONDARY",
      branch: "ART",
      specilize: "ART",
      year: "II",
    },
    {
      gradename: "XII",
      category: "HIGHERSECONDARY",
      branch: "BIOLOGY",
      specilize: "SCIENCE",
      year: "II",
    },
    {
      gradename: "XII",
      category: "HIGHERSECONDARY",
      branch: "COMMERCE",
      specilize: "COMMERCE",
      year: "II",
    },
    {
      gradename: "XII",
      category: "HIGHERSECONDARY",
      branch: "MATHEMATICS",
      specilize: "SCIENCE",
      year: "II",
    },
    {
      gradename: "XII",
      category: "HIGHERSECONDARY",
      branch: "HOMESCINCE",
      specilize: "SCIENCE",
      year: "II",
    },
    {
      gradename: "XII",
      category: "HIGHERSECONDARY",
      branch: "COMPUTERSCINCE",
      specilize: "SCIENCE",
      year: "II",
    },

    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "I",
      year: "I",
    },
    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "II",
      year: "I",
    },
    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "III",
      year: "II",
    },
    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "IV",
      year: "II",
    },
    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "V",
      year: "III",
    },
    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "VI",
      year: "III",
    },
    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "VII",
      year: "IV",
    },
    {
      gradename: "UG",
      category: "BE",
      branch: "CS",
      specilize: "COMPUTERSCINCE",
      semester: "VIII",
      year: "IV",
    },

    { gradename: "PG", category: "COLLEGE" },
  ];

  const columns = [
    {
      name: "gradename",
      label: "GRADES",
    },
    {
      name: "category",
      label: "CATEGORY",
    },
    {
      name: "branch",
      label: "BRANCH",
    },
    {
      name: "specilize",
      label: "SPECIALIZATION",
    },
    { name: "semester", label: "SEMESTER" },
    {
      name: "year",
      label: "YEAR",
    },
    {
      name: "isPublished",
      label: "IsPublished",
    },
  ];
  const [gradeSelected, setGradeSelected] = useState({});
  const [gradeRows, setGradeRows] = useState(null);
  let selectedRowData = [];
  if (gradeRows) {
    console.log("gradeRows");
    selectedRowData = gradeRows.map((rownum) => {
      console.log("ROWNUMBBER", rownum.index);
      return grades[rownum.index];
    });
  }
  console.log("GRADEROWS ", gradeRows, "Data =", selectedRowData);
  const options = {
    print: false,
    download: false,
    selectableRows: "multiple",
    rowsSelected: gradeSelected.rowsSelected,
    onRowsSelect: (rowsSelected, allRows) => {
      setGradeSelected({ rowsSelected: allRows.map((row) => row.dataIndex) });
      console.log("ALLROWS ", gradeSelected);
      setGradeRows(allRows);
    },
  };
  return (
    <div>
      <button
        onClick={() => {
          const selectedRowData = gradeRows.map((rownum) => {
            console.log("ROWNUMBBER", rownum.index);

            createGrade({ variables: grades[rownum.index] }).then((res) => {
              console.log("RESPONSE FOR CREATE GRADE ", res);
            });
          });
          let rowsSelected = [];
          setGradeSelected(rowsSelected);
        }}
      >
        CreateGrades
      </button>
      <MUIDataTable
        title="GRADES"
        data={grades}
        columns={columns}
        options={options}
      />
    </div>
  );
}
