import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
export default function OptionalField(props) {
  const stateList = [
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "DORMANT", value: "DORMANT" },
    { label: "DEACTIVE", value: "DEACTIVE" },
  ];
  const availableList = [
    { label: "FREE", value: "FREE" },
    { label: "PAID", value: "PAID" },
    { label: "SPONSERED", value: "SPONSERED" },
    { label: "SUBSIDIZED", value: "SUBSIDIZED" },
  ];
  const levelList = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  const statusList = [
    { label: "APPROVED", value: "APPROVED" },
    { label: "SUBMITTED", value: "SUBMITTED" },
    { label: "REJECTED", value: "REJECTED" },
  ];
  const contentTypeList = [
    { label: "HTML", value: "HTML" },
    { label: "YOUTUBE", value: "YOUTUBE" },
    { label: "FILE", value: "FILE" },
  ];

  return (
    <div className="p-grid p-fluid">
      <div className="card card-w-title">
        <div className="p-grid">
          <div className="p-col-12 p-md-3">
            <Dropdown
              options={contentTypeList}
              value={props.contentTypeVal}
              onChange={(event) => props.setContentTypeVal(event.value)}
              autoWidth={true}
            />
          </div>
          <div className="p-col-12 p-md-3">
            <Dropdown
              options={stateList}
              value={props.state}
              onChange={(event) => props.setState(event.value)}
              autoWidth={true}
            />
          </div>
          <div className="p-col-12 p-md-2">
            <Dropdown
              options={statusList}
              value={props.status}
              onChange={(event) => props.setStatus(event.value)}
              autoWidth={true}
            />
          </div>
          <div className="p-col-12 p-md-2">
            <Dropdown
              options={availableList}
              value={props.available}
              onChange={(event) => props.setAvailable(event.value)}
              autoWidth={true}
            />
          </div>
          <div className="p-col-12 p-md-2">
            <Dropdown
              options={levelList}
              value={props.level}
              placeholder="Level"
              onChange={(event) => props.setLevel(event.value)}
              autoWidth={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
