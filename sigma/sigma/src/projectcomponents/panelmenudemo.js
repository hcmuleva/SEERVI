import React, { useState } from "react";

import { PanelMenu } from "primereact/panelmenu";

export default function panelmenu(props) {
  // console.log("panelmenu props", props);
  // let subjectdata = props.unitData;
  // let data = {};
  // let contentItems = [];
  // let items = [];
  // if (subjectdata) {
  //   console.log(
  //     "subjectdata ",
  //     subjectdata.getSubjectById,
  //     " ID =>",
  //     subjectdata.getSubjectById.id,
  //     " UNIITS ",
  //     subjectdata.getSubjectById.units
  //   );
  //   data["contents"] = subjectdata.getSubjectById.contents;
  //   console.log("DATA ", JSON.stringify(data));
  //   if (
  //     subjectdata.getSubjectById.units &&
  //     subjectdata.getSubjectById.units.length > 0
  //   ) {
  //     console.log("THERE ARE UNIITS");
  //   } else {
  //     let mycontents = [];
  //     data.contents.map((content) => {
  //       mycontents.push({
  //         label: content.name,
  //         icon: "pi pi-fw pi-video",
  //         command: () => {
  //           console.log("CLICKED on NEW", content.name);
  //         },
  //       });
  //     });

  //     console.log(items, "ITEMS1 ");
  //   }
  // }
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "Bookmark",
              icon: "pi pi-fw pi-bookmark",
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video",
            },
          ],
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left",
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right",
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print",
                },
              ],
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },
  ];
  // let items = [
  //   {
  //     label: "New",
  //     icon: "pi pi-fw pi-plus",
  //     command: () => {
  //       console.log("CLICKED on NEW");
  //     },
  //   },
  //   { label: "Delete", icon: "pi pi-fw pi-trash" },
  //   { label: "Material", items: contentItems },
  // ];

  return <PanelMenu model={items} style={{ width: "300px" }} />;
}
