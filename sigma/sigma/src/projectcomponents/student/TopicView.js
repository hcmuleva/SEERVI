import React from "react";
import { Card } from "primereact/card";

export default function TopicView(props) {
  //This is TopicCard and it will only show Topic
  //Topic Header will contains information LEVELS, BM(2) D(3) N(3)
  //Topic Footer wiill contains information  Q,E,F,TT,P
  const header = (
    <img alt="Card" src="showcase/resources/demo/images/usercard.png" />
  );
  const footer = (
    <span>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-secondary"
      />
    </span>
  );

  return <div></div>;
}
