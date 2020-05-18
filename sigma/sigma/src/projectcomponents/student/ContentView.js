import React from "react";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
export default function ContentView(props) {
  const getContentCard = () => {
    if ("HTML" === props.type || "FILE" === props.type) {
      return (
        <Iframe
          url={props.url}
          width="450px"
          height="450px"
          id={props.id}
          className="myClassname"
          display="initial"
          position="relative"
        />
      );
    } else if ("YOUTUBE" === props.type) {
      return (
        <ReactPlayer
          className="react-player"
          url={props.url}
          controls={true}
          light={true}
          playbackRate={1}
          width="420px"
          height="280px"
        />
      );
    }
  };

  return getContentCard();
}
