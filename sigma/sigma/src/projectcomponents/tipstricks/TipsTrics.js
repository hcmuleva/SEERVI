import React from "react";

export function TipsTrics(props) {
  console.log("TipsTrics ", props);
  return (
    <div>
      <h1>TipsTrics {props.match.params.name}</h1>
    </div>
  );
}
