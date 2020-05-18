import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { Link } from "react-router-dom";
export default function Coursedesign(props) {
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          command: () => {
            window.location.hash = "/forms";
          },
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
  return (
    <div className="p-grid ">
      <div
        className="p-col-4 p-lg-4"
        style={{ marginBottom: "10px", marginLeft: "0px" }}
      >
        <div className="card card-w-title">
          <h1>InputText11</h1>
          <span className="input-group-btn">
            <Link to="/subjectcontent/HCMSUBJECTIID">Click to login</Link>
          </span>
          <div className="content-section introduction">
            <div className="feature-intro">
              <h1>PanelMenu</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="p-col-8 " style={{ marginBottom: "10px" }}>
        <div className="card card-w-title">
          <div className="p-col-12">
            <div className="card card-w-title">
              <h1>Editor</h1>
              <Editor style={{ height: "320px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
