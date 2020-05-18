import React from "react";
import { Card } from "primereact/card";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
export default function CardView(props) {
  if (!props.dataList) return <div>Error</div>;
  const getCard = (data) => {
    if ("YOUTUBE" === data.type) {
      return (
        <ReactPlayer
          className="react-player"
          url={data.url}
          controls={true}
          id={data.id}
          light={true}
          playbackRate={1}
          width="420px"
          height="280px"
        />
      );
    }
    if ("HTML" === data.type || "FILE" === data.type) {
      return (
        <Iframe
          url={data.url}
          width="350px"
          height="350px"
          id={data.id}
          className="myClassname"
          display="initial"
          position="relative"
        />
      );
    }
  };
  const getCardData = (data) => {
    return (
      <Card
        key={data.id}
        title={data.name}
        style={{ width: "360px" }}
        className="ui-card-shadow"
      >
        {getCard(data)}
      </Card>
    );
  };

  return props.dataList.map((data) => {
    return getCardData(data);
  });
}
