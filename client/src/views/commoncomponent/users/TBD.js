import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import CreateOrgDialog from "../org/addOrgdialog";
import { Container, Row, Col } from "shards-react";
export default function TBD() {
  const columns = [
    {
      name: "Name",
      options: {
        filter: true,
        display: "excluded",
      },
    },
    {
      label: "Modified Title Label",
      name: "Title",
      options: {
        filter: true,
      },
    },
    {
      name: "Location",
      options: {
        filter: false,
        customHeadRender: (columnMeta, updateDirection) => (
          <th
            key={2}
            onClick={() => updateDirection(2)}
            style={{ cursor: "pointer" }}
          >
            {columnMeta.name}
          </th>
        ),
      },
    },
    {
      name: "Age",
      options: {
        filter: true,
        print: false,
      },
    },
    {
      name: "Salary",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "Tags",
      options: {
        filter: true,
        filterType: "multiselect",
        customBodyRender: (value) => {
          return value.map((val, key) => {
            return <Chip label={val} key={key} />;
          });
        },
      },
    },
    {
      name: "AssignRoles",
      options: {
        customBodyRender: () => {
          return <CreateOrgDialog />;
        },
      },
    },
  ];

  const data = [
    [
      "Gabby George",
      "Business Analyst",
      "Minneapolis",
      30,
      "$100,000",
      ["nice", "preferred"],
    ],
    [
      "Aiden Lloyd",
      "Business Consultant",
      "Dallas",
      55,
      "$200,000",
      ["grumpy", "second-choice"],
    ],
    [
      "Jaden Collins",
      "Attorney",
      "Santa Ana",
      27,
      "$500,000",
      ["frequently-busy", "leave-message"],
    ],
    [
      "Franky Rees",
      "Business Analyst",
      "St. Petersburg",
      22,
      "$50,000",
      ["in-person", "nice"],
    ],
    [
      "Aaren Rose",
      "Business Consultant",
      "Toledo",
      28,
      "$75,000",
      ["preferred"],
    ],
    [
      "Blake Duncan",
      "Business Management Analyst",
      "San Diego",
      65,
      "$94,000",
      ["nice"],
    ],
    [
      "Frankie Parry",
      "Agency Legal Counsel",
      "Jacksonville",
      71,
      "$210,000",
      ["nice", "preferred"],
    ],
    [
      "Lane Wilson",
      "Commercial Specialist",
      "Omaha",
      19,
      "$65,000",
      ["frequently-busy", "leave-message"],
    ],
    [
      "Robin Duncan",
      "Business Analyst",
      "Los Angeles",
      20,
      "$77,000",
      ["frequently-busy", "leave-message", "nice"],
    ],
    [
      "Mel Brooks",
      "Business Consultant",
      "Oklahoma City",
      37,
      "$135,000",
      ["grumpy", "second-choice"],
    ],
    ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000", ["preferred"]],
    [
      "Kris Humphrey",
      "Agency Legal Counsel",
      "Laredo",
      30,
      "$150,000",
      ["preferred"],
    ],
    [
      "Frankie Long",
      "Industrial Analyst",
      "Austin",
      31,
      "$170,000",
      ["preferred"],
    ],
    [
      "Brynn Robbins",
      "Business Analyst",
      "Norfolk",
      22,
      "$90,000",
      ["preferred"],
    ],
    [
      "Justice Mann",
      "Business Consultant",
      "Chicago",
      24,
      "$133,000",
      ["preferred"],
    ],
    [
      "Addison Navarro",
      "Business Management Analyst",
      "New York",
      50,
      "$295,000",
      ["preferred"],
    ],
    [
      "Jesse Welch",
      "Agency Legal Counsel",
      "Seattle",
      28,
      "$200,000",
      ["preferred"],
    ],
    [
      "Eli Mejia",
      "Commercial Specialist",
      "Long Beach",
      65,
      "$400,000",
      ["preferred"],
    ],
    [
      "Gene Leblanc",
      "Industrial Analyst",
      "Hartford",
      34,
      "$110,000",
      ["preferred"],
    ],
    [
      "Danny Leon",
      "Computer Scientist",
      "Newark",
      60,
      "$220,000",
      ["preferred"],
    ],
    [
      "Lane Lee",
      "Corporate Counselor",
      "Cincinnati",
      52,
      "$180,000",
      ["preferred"],
    ],
    [
      "Jesse Hall",
      "Business Analyst",
      "Baltimore",
      44,
      "$99,000",
      ["preferred"],
    ],
    [
      "Danni Hudson",
      "Agency Legal Counsel",
      "Tampa",
      37,
      "$90,000",
      ["preferred"],
    ],
    [
      "Terry Macdonald",
      "Commercial Specialist",
      "Miami",
      39,
      "$140,000",
      ["preferred"],
    ],
    ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000", ["preferred"]],
    [
      "Silver Carey",
      "Computer Scientist",
      "Memphis",
      47,
      "$250,000",
      ["preferred"],
    ],
    [
      "Franky Miles",
      "Industrial Analyst",
      "Buffalo",
      49,
      "$190,000",
      ["preferred"],
    ],
    [
      "Glen Nixon",
      "Corporate Counselor",
      "Arlington",
      44,
      "$80,000",
      ["preferred"],
    ],
    [
      "Gabby Strickland",
      "Business Process Consultant",
      "Scottsdale",
      26,
      "$45,000",
      ["preferred"],
    ],
    [
      "Mason Ray",
      "Computer Scientist",
      "San Francisco",
      39,
      "$142,000",
      ["preferred"],
    ],
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    expandableRows: true,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex, expandedRows) => {
      console.log("DATA index", dataIndex, "   expandRows", expandedRows);
      // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
      if (
        expandedRows.data.length > 4 &&
        expandedRows.data.filter((d) => d.dataIndex === dataIndex).length === 0
      )
        return false;
      return true;
    },
    rowsExpanded: [],
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      console.log("row data ", rowData);
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <Container fluid className="main-content-container px-4">
              <Col lg="6" sm="12" className="mb-4">
                <Card small className="card-post card-post--1">
                  {rowData[0]}
                </Card>
              </Col>
            </Container>
          </TableCell>
        </TableRow>
      );
    },
    onRowsExpand: (curExpanded, allExpanded) =>
      console.log("hhhh=>", curExpanded, allExpanded),
  };
  const theme = createMuiTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          // Soft hide the button.
          visibility: "hidden",
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <MUIDataTable
        title={"ACME Employee list"}
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
}
