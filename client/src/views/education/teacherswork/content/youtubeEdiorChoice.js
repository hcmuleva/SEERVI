import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function YoutubeEdiorChoice(props) {
  const handleChange = (e) => {
    console.log("E TARGET ", e.target.value);
    props.setFileData({
      ...props.fileData,
      ["fileInfo"]: { fileInfo: "QUILE" },
      ["type"]: "YOUTUBE",
      ["url"]: e.target.value,
    });
  };
  return (
    <div>
      <TextField
        required
        id="outlined-required"
        label="Enter YouTube url"
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
}
