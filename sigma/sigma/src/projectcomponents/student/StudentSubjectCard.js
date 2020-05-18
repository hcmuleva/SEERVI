import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function StudentSubjectCard(props) {
  const subject = props.subject;
  const header = <img alt="SUBJECT" src={subject.picture} />;
  const footer = (
    <span>
      <Button label="T&T" icon="pi pi-check" />
      <Button label="FML" icon="pi pi-check" />
      <Button label="PPR" icon="pi pi-check" />
      <Button label="NS" icon="pi pi-check" />
      <Button label="BM" icon="pi pi-check" />
      <Button label="DB" icon="pi pi-check" />
    </span>
  );

  return (
    <Card
      key={subject.id}
      title={subject.name}
      subTitle={subject.std.gradename}
      style={{ width: "360px" }}
      className="ui-card-shadow"
      header={header}
      footer={footer}
    ></Card>
  );
}
